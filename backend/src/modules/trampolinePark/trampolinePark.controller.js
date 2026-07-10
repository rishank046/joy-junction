import trampolineService from './trampolinePark.service.js';

const checkAvailability = async (req , res) => {
    const {date, startTime, endTime, tickets} = req.body;

    if (!date || !startTime || !endTime || !tickets) {
        throw new Error('Query string parameters: date, startTime, endTime, and tickets are mandatory.');
    }

    const payload = await trampolineService.checkAvailability(date, startTime, endTime, tickets);

    res.status(200).json({
        data : payload
    });
}

const bookTrampolineTickets = async (req, res) => {
    // Payload signature: { "date": "2026-07-12", "startTime": "14:00:00", "endTime": "15:00:00", "seats": 3 }
    const { date, startTime, endTime, seats } = req.body;
    const userId = req.user.id; // via jwt

    if (!date || !startTime || !endTime || !seats) {
        throw new Error('Payload error: missing mandatory parameters (date, startTime, endTime, seats).');
    }

    const receipt = await trampolineService.bookTicket(
        userId,
        date,
        startTime,
        endTime,
        seats
    );

    return res.status(201).json({
        success: true,
        message: 'Tickets booked successfully.',
        data: {
            bookingId: receipt.id,
            seatsBooked: receipt.seats_booked,
            pricePerTicket: receipt.unitPrice,
            totalPaid: receipt.totalCost,
            timestamp: receipt.booked_at
        }
    });
}

export default {checkAvailability , bookTrampolineTickets};