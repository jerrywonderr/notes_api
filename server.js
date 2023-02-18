import app from './index.mjs';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env['PORT'];
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});