import { Router } from "express";
import UserNote from "../models/usernote.model.mjs";

const router = Router();

router.get('/all', async (req, res) => {
    const userHash = "a3fcf47b-43f8-4669-a16c-1482becbea48";
    const userNote = new UserNote(userHash);
    const notes = await userNote.all();
    res.status(notes.error ? 404 : 200);
    res.json(notes);
    res.end();
});

router.post('/new', async(req, res) => {
    const {title, content} = req.body;
    const userHash = "a3fcf47b-43f8-4669-a16c-1482becbea48";
    const userNote = new UserNote(userHash);
    const notes = await userNote.new(title, content);
    res.status(notes.error ? 404 : 200);
    res.json(notes);
    res.end();
});

router.get('/:hashCode', async (req, res) => {
    const {hashCode} = req.params
    const userHash = "a3fcf47b-43f8-4669-a16c-1482becbea48";
    const userNote = new UserNote(userHash);
    const note = await userNote.get(hashCode);
    res.status(note.error ? 404 : 200);
    res.json(note);
    res.end();
});

router.delete('/:hashCode', async (req, res) => {
    const {hashCode} = req.params;
    const userHash = "a3fcf47b-43f8-4669-a16c-1482becbea48";
    const userNote = new UserNote(userHash);
    const notes = await userNote.delete(hashCode);
    res.status(notes.error ? 404 : 200);
    res.json(notes);
    res.end();
});

router.put('/:hashCode', async(req, res) => {
    const {hashCode} = req.params;
    const {title, content} = req.body;
    const userHash = "a3fcf47b-43f8-4669-a16c-1482becbea48";
    const userNote = new UserNote(userHash);
    const note = await userNote.update(hashCode, title, content);
    res.status(note.error ? 404 : 200);
    res.json(note);
    res.end();
});

export default router;