import express from 'express';
import 'dotenv/config';
import errorHandler from '#middleware/errorhandler';
// import authenticator from './middleware'
const app = express();
import trampolineRouter from './modules/trampolinePark/trampolinePark.router.js';

app.use(express.json());
// app.use(authenticator);

app.use('/trampoline' , trampolineRouter);
app.use(errorHandler);

app.listen(process.env.PORT , () => {
    console.log(`listening on port ${process.env.PORT}`);
})