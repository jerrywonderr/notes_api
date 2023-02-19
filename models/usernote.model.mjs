import { queryDB } from "../db/db.mjs";
import Note from "./notes.model.mjs";

class UserNote {
    /**
     * Simply initializes a UserNote instance to manage a user's note
     * Arguments:
     *     @param {string} user_hash: Unique hash of the user to be worked with
     */
    constructor(user_hash) {
        this.user_hash = user_hash;
    }

    /**
     * Gets all notes attached to the user
     * @returns an object of the form 
     *  {
     *      data: [],
     *      error: boolean,
     *      message: string
     *  }
     */
    async all() {
        const query = `SELECT * FROM notes WHERE user_hash = ?`;
        const result = await queryDB(query, [this.user_hash]);
        return result;
    }

    /**
     * Gets the note attached to the user identified by hash_code
     * 
     * @param {string} hash_code the hash_code of the note to be fetched
     * @returns an object of the form 
     *  {
     *      data: [],
     *      error: boolean,
     *      message: string
     *  }
     */
    async get(hash_code) {
        let response;
        try {
            const query = `SELECT * FROM notes WHERE user_hash = ? AND hash_code = ?`;
            response = await queryDB(query, [this.user_hash, hash_code]);
            if (response.data.length == 0) {
                throw Error("Couldn't fetch note with that hash code");
            }
        } catch (e) {
            response.message = e.message;
            response.error = true;
        }
        return response;
    }

    /**
     * Creates a new user note
     * @param {string} title the title of the note
     * @param {string} content the content of the note
     * @returns an object of the form 
     *  {
     *      data: [],
     *      error: boolean,
     *      message: string
     *  }
     */
    async new(title, content) {
        const note = new Note(this.user_hash);
        note.title = title;
        note.content = content;
        const response = await note.save();
        return response;
    }

    /**
     * Updates a user's note
     * @param {string} hash_code the note's hash code
     * @param {string} title the new note title
     * @param {string} content the new note content
     * @returns an object of the form 
     *  {
     *      data: [],
     *      error: boolean,
     *      message: string
     *  }
     */
    async update(hash_code, title='', content='') {
        let response;

        const note = new Note(this.user_hash, hash_code);
        response = await note.setInstanceAttributes();

        if (response.error) return response;

        if (title) note.title = title;
        if (content) note.content = content;

        response = await note.save();
        return response;
    }

    /**
     * Deletes a user's note
     * @param {string} hash_code the hash code of the note to be deleted
     * @returns an object of the form 
     *  {
     *      data: [],
     *      error: boolean,
     *      message: string
     *  }
     */
    async delete(hash_code) {
        let response;

        const note = new Note(this.user_hash, hash_code);
        response = await note.setInstanceAttributes();

        if (response.error) return response;

        response = await note.delete();
        return response;
    }
}

export default UserNote;