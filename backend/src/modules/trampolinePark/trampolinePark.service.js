import pool from '#config/db';

const checkAvailability = async (dateStr, startTimeStr, endTimeStr, tickets) => {
    if (isNaN(tickets) || tickets <= 0) {
        throw new Error('Requested tickets quantity must be an integer greater than 0.');
    }

    const configQuery = `
        SELECT 
            s.id AS service_id,
            ts.slot_no,
            ts.start_time,
            ts.end_time,
            s.max_capacity,
            CASE 
                WHEN EXTRACT(ISODOW FROM $1::date) IN (6, 7) THEN sp.wep
                ELSE sp.wdp
            END AS per_ticket_price
        FROM public.services s
        CROSS JOIN public.time_slots ts
        JOIN public.prices sp ON sp.service_id = s.id
        WHERE LOWER(s.name) = 'trampoline park'
          AND ts.start_time = $2::time 
          AND ts.end_time = $3::time
        LIMIT 1;
    `;

    const configResult = await pool.query(configQuery, [dateStr, startTimeStr, endTimeStr]);
    
    if (configResult.rows.length === 0) {
        throw new Error('The requested time slot or service does not exist in the system configuration.');
    }

    const { service_id, slot_no, start_time, end_time, max_capacity, per_ticket_price } = configResult.rows[0];

    const occupancyQuery = `
        SELECT COALESCE(SUM(no_of_tickets), 0) AS total_booked
        FROM public.bookings
        WHERE service_id = $1 
          AND slot_no = $2 
          AND date = $3::date;
    `;

    const occupancyResult = await pool.query(occupancyQuery, [service_id, slot_no, dateStr]);
    const currentOccupancy = parseInt(occupancyResult.rows[0].total_booked, 10);

    const remainingSeats = max_capacity - currentOccupancy;
    const isAvailable = (currentOccupancy + tickets) <= max_capacity;

    return {
        slot_no,
        start_time,
        end_time,
        max_capacity,
        current_occupancy: currentOccupancy,
        remaining_seats: remainingSeats,
        is_available: isAvailable,
        per_ticket_price: parseFloat(per_ticket_price)
    };
};

const bookTicket = async (userId, dateStr, startTimeStr, endTimeStr, seatsRequested) => {
    const seats = parseInt(seatsRequested, 10);
    if (isNaN(seats) || seats <= 0) {
        throw new Error('Seat quantity must be a valid integer greater than 0.');
    }

    if (!dateStr || !startTimeStr || !endTimeStr) {
        throw new Error('Missing input parameters: date, startTime, and endTime are mandatory.');
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Scalar subquery avoids GROUP BY constraint, allowing FOR UPDATE
        // 2. Replaced CROSS JOIN with a filtered JOIN
        const lockAndResolveQuery = `
            SELECT 
                s.id AS service_id,
                ts.slot_no,
                s.max_capacity,
                (
                    SELECT COALESCE(SUM(b.no_of_tickets), 0)
                    FROM public.bookings b
                    WHERE b.service_id = s.id 
                      AND b.slot_no = ts.slot_no 
                      AND b.date = $1::date
                ) AS current_occupancy,
                CASE 
                    WHEN EXTRACT(ISODOW FROM $1::date) IN (6, 7) THEN sp.wep
                    ELSE sp.wdp
                END AS single_seat_price
            FROM public.services s
            JOIN public.time_slots ts 
              ON ts.start_time = $2::time AND ts.end_time = $3::time
            JOIN public.prices sp 
              ON sp.service_id = s.id
            WHERE LOWER(s.name) = 'trampoline park'
            FOR UPDATE OF s;
        `;
        
        const slotCheck = await client.query(lockAndResolveQuery, [dateStr, startTimeStr, endTimeStr]);

        if (slotCheck.rows.length === 0) {
            throw new Error('No active service or matching time slot found.');
        }

        const { service_id, slot_no, max_capacity, current_occupancy, single_seat_price } = slotCheck.rows[0];

        const currentOccupancyInt = parseInt(current_occupancy, 10);
        if (currentOccupancyInt + seats > max_capacity) {
            throw new Error(`Booking rejected: Only ${max_capacity - currentOccupancyInt} seats remaining for this window.`);
        }

        const unitPrice = parseFloat(single_seat_price);
        const totalCost = unitPrice * seats;

        const insertBookingQuery = `
            INSERT INTO public.bookings (service_id, slot_no, user_id, no_of_tickets, date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, service_id, slot_no, user_id, no_of_tickets AS seats_booked, date, created_at AS booked_at;
        `;
        const bookingResult = await client.query(insertBookingQuery, [service_id, slot_no, userId, seats, dateStr]);
        const booking = bookingResult.rows[0];

        const insertTicketsQuery = `
            WITH inserted_tickets AS (
                INSERT INTO public.ticket (booking_id, start_time, end_time, date)
                SELECT $1, $2::time, $3::time, $4::date
                FROM generate_series(1, $5)
                RETURNING id, booking_id, start_time, end_time, date, created_at
            )
            SELECT COALESCE(json_agg(inserted_tickets), '[]'::json) AS tickets_list 
            FROM inserted_tickets;
        `;
        
        const ticketResult = await client.query(insertTicketsQuery, [booking.id, startTimeStr, endTimeStr, dateStr, seats]);
        const tickets = ticketResult.rows[0].tickets_list;

        await client.query('COMMIT');

        return { 
            ...booking, 
            unitPrice, 
            totalCost,
            tickets 
        };

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;                   
    } finally {
        client.release();               
    }
};

const getBookedTickets = async (userId) => {
    if (!userId) {
    throw new Error("VALIDATION_ERROR: userId parameter is required.");
  }

  // 2. Query Definition
  // Uses parameterized inputs ($1) to guarantee protection against SQL injection
  const query = `
   SELECT 
    id, 
    start_time, 
    end_time, 
    date, 
    created_at AS booking_time
FROM ticket
WHERE booking_id IN (
    SELECT id 
    FROM bookings 
    WHERE user_id = $1
);
  `;

  // 3. Execution Engine
  try {
    const result = await pool.query(query, [userId]);
    return result.rows; // Returns an array of ticket objects, or [] if none exist
  } catch (error) {
    // Log the full stack trace internally for debugging
    console.error("Query Execution Failure (getBookedTickets):", error.stack);
    
    // Throw a sanitized error back up the call stack to the controller
    throw new Error("DB_ERROR: Failed to fetch booked tickets.");
  }
}

export default { checkAvailability, bookTicket , getBookedTickets};