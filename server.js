import app from './index.mjs';

const port = process.env['PORT'];
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});