import { Router } from "express";
import User from "../models/users.model.mjs";

const router = Router();

// router.get()
// Get note
// Create note
// Update note
// delete note

router.get('', async (req, res) => {
    console.log(process.env['DB_HOST']);
    const user = await new User('kskdoiks');
    res.end();
});

export default router;