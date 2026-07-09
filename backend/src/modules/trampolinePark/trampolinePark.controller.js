import trampolineService from './trampolinePark.service.js';

const checkAvailability = async (req , res) => {
    const {timezone , date , tickets} = req.body;

    const payload = await trampolineService.checkAvailability({timezone , date , tickets});

    res.status(201).json({
        data : payload
    });
}

const bookTrampolineTickets = async (req , res) => {
    const {timezone , date , tickets , personDetails} = req.body;

    await trampolineService.bookTicket({timezone , date , tickets , personDetails});

    res.status(201).json({
        status : "booked service"
    })
}

export default {checkAvailability , bookTrampolineTickets};