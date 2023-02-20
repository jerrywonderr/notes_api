import { Router } from "express";
import { createToken } from "../helpers/index.mjs";
import User from '../models/users.model.mjs';

const router = Router();

router.post('/user/new', async (req, res) => {
  const {email, password} = req.body;
  const user = new User('', password);
  user.email = email;
  await user.setUpPassword();
  const response = await user.save();
  res.status(response.error ? 404 : 201);
  res.json(response);
  res.end();
});

router.post('/login', async (req, res) => {
  const response = {
    data: [],
    message: 'success',
    error: false
  }
  try {
    const {email, password} = req.body;
    if (!email) {
      throw Error('Invalid or empty email');
    }
    if (!password) {
      throw Error('Invalid or empty password');
    }
    const user = new User();

    let result = await user.setInstanceAttributes('email', email);
    if (result.error) throw Error(`No user identified with ${email} found`);

    const verified = await user.verify(password);
    if (!verified) throw Error('Invalid login details.');

    const payload = {user_hash: user.hash_code}
    const token = createToken(payload);
    response.data.push({token});
    res.status(200);
  } catch (err) {
    response.message = err.message;
    response.error = true;
    res.status(406);
  }
  res.json(response);
  res.end();
});

export default router;