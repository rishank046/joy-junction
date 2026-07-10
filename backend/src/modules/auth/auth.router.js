import express from 'express';
import { signup, login } from './auth.controller.js';
import catchWrapper from '#middleware/catchWrapper'; // Mount your wrapper directly

const router = express.Router();

// Wrap the route references inside your catchWrapper execution path
router.post('/signup', catchWrapper(signup));
router.post('/login', catchWrapper(login));

export default router;