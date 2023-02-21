import express from 'express';
import bodyParser from 'body-parser';
import noteRoutes from './routes/notes.routes.mjs';
import userRoutes from './routes/user.routes.mjs';
import cors from 'cors';
import path from 'path';
import { bounceUnathenticated } from './middleware.js';

const app = express();

app.use(cors());

app.use(express.static(path.resolve('public')));
app.use(bounceUnathenticated);
app.use(bodyParser.json());
app.use('/notes', noteRoutes);
app.use('/auth', userRoutes);

export default app