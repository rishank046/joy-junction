import express from 'express';
import 'dotenv/config';
import errorHandler from '#middleware/errorhandler';
import auth from './modules/auth/auth.router.js';
const app = express();
import trampolineRouter from './modules/trampolinePark/trampolinePark.router.js';

app.use(express.json());

app.use('/trampoline' , trampolineRouter);
app.use('/auth' , auth);
app.use(errorHandler);

app.listen(process.env.PORT , () => {
    console.log(`listening on port ${process.env.PORT}`);
})