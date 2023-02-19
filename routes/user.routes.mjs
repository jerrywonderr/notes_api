import { Router } from "express";
import User from '../models/users.model.mjs'
const router = Router();

router.post('/', async (req, res) => {
    const email = req.body.email
    const user = new User();
    user.email = email;
    const response = await user.save();
    res.status(response.error ? 404 : 201);
    res.json(response);
    res.end();
});

export default router;