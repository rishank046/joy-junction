import express from 'express';
import controller from './trampolinePark.controller.js';
import authenticate from '#middleware/authenticator';
import trampolineController from './trampolinePark.controller.js';
import catchWrapper from '#middleware/catchWrapper';
const router = express.Router();

//anyone can see the availability but only logged user can book tickets
router.post('/booking' , authenticate ,catchWrapper(controller.bookTrampolineTickets));
router.get('/availability' ,catchWrapper(controller.checkAvailability));

export default router;