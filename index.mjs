import express from 'express';
import bodyParser from 'body-parser';
import noteRoutes from './routes/notes.routes.mjs';
import userRoutes from './routes/user.routes.mjs';
import cors from 'cors';

const app = express();

// app.use(cors());

app.use(bodyParser.json());
app.use('/notes', noteRoutes);
app.use('/user', userRoutes);

export default app