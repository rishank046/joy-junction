import express from 'express';
import controller from './trampolinePark.controller.js';
import trampolineController from './trampolinePark.controller.js';
import catchWrapper from '#middleware/catchWrapper';
const router = express.Router();

router.post('/booking' , catchWrapper(controller.bookTrampolineTickets));
router.get('/availability' , catchWrapper(controller.checkAvailability));

export default router;