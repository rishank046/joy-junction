import pool from '#config/db';

const checkAvailability = async (dateStr, startTimeStr, endTimeStr, tickets) => {

    if (isNaN(tickets) || tickets <= 0) {
        throw new Error('Requested tickets quantity must be an integer greater than 0.');
    }

    const absoluteWindowStart = `${dateStr} ${startTimeStr}`;
    const absoluteWindowEnd = `${dateStr} ${endTimeStr}`;

    const queryText = `
        WITH service_meta AS (
            SELECT id, max_capacity 
            FROM services 
            WHERE LOWER(name) = 'trampoline zone'
            LIMIT 1
        ),
        inserted_availability AS (
            INSERT INTO service_availability (resource_id, start_time, end_time, current_occupancy)
            SELECT id, $1::timestamp, $2::timestamp, 0 
            FROM service_meta
            ON CONFLICT (resource_id, start_time, end_time) DO NOTHING
            RETURNING id, current_occupancy
        )
        SELECT 
            sa.id AS availability_id,
            sa.start_time,
            sa.end_time,
            sm.max_capacity,
            sa.current_occupancy,
            (sm.max_capacity - sa.current_occupancy) AS remaining_seats,
            CASE 
                WHEN EXTRACT(ISODOW FROM sa.start_time) IN (6, 7) THEN sp.weekend_price
                ELSE sp.weekday_price
            END AS per_ticket_price
        FROM service_availability sa
        JOIN service_meta sm ON sa.resource_id = sm.id
        JOIN service_prices sp ON sp.service_id = sm.id
        WHERE sa.start_time = $1::timestamp 
          AND sa.end_time = $2::timestamp
          AND (sa.current_occupancy + $3) <= sm.max_capacity;
    `;

    const result = await pool.query(queryText, [absoluteWindowStart, absoluteWindowEnd, tickets]);
    return result.rows; 
};

const bookTicket = async (userId, dateStr, startTimeStr, endTimeStr, seatsRequested) => {
    const seats = parseInt(seatsRequested, 10);
    if (isNaN(seats) || seats <= 0) {
        throw new Error('Seat quantity must be a valid integer greater than 0.');
    }

    if (!dateStr || !startTimeStr || !endTimeStr) {
        throw new Error('Missing input parameters: date, startTime, and endTime are mandatory.');
    }

    const absoluteStart = `${dateStr} ${startTimeStr}`;
    const absoluteEnd = `${dateStr} ${endTimeStr}`;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const lockAndResolveQuery = `
            SELECT 
                sa.id AS availability_id,
                sa.current_occupancy, 
                s.max_capacity,
                CASE 
                    WHEN EXTRACT(ISODOW FROM sa.start_time) IN (6, 7) THEN sp.weekend_price
                    ELSE sp.weekday_price
                END AS single_seat_price
            FROM service_availability sa
            JOIN services s ON sa.resource_id = s.id
            JOIN service_prices sp ON sp.service_id = s.id
            WHERE LOWER(s.name) = 'trampoline zone'
              AND sa.start_time = $1::timestamp
              AND sa.end_time = $2::timestamp
            FOR UPDATE;
        `;
        
        const slotCheck = await client.query(lockAndResolveQuery, [absoluteStart, absoluteEnd]);

        if (slotCheck.rows.length === 0) {
            throw new Error('No active trampoline park schedule found matching the requested date and time window.');
        }

        const { availability_id, current_occupancy, max_capacity, single_seat_price } = slotCheck.rows[0];

        if (current_occupancy + seats > max_capacity) {
            throw new Error(`Booking rejected: Only ${max_capacity - current_occupancy} seats remaining for this window.`);
        }

        const unitPrice = parseFloat(single_seat_price);
        const totalCost = unitPrice * seats;

        await client.query(`UPDATE service_availability SET current_occupancy = current_occupancy + $1 WHERE id = $2;`, [seats, availability_id]);

        const insertBookingQuery = `
            INSERT INTO trampoline_bookings (user_id, availability_id, seats_booked)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, availability_id, seats_booked, booked_at;
        `;
        const bookingResult = await client.query(insertBookingQuery, [userId, availability_id, seats]);

        await client.query('COMMIT');

        return { ...bookingResult.rows[0], unitPrice, totalCost };

    } catch (error) {
        await client.query('ROLLBACK'); // 1. Secure DB integrity
        throw error;                   
    } finally {
        client.release();               
    }
};

export default {checkAvailability , bookTicket};