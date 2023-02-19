import { queryDB } from '../db/db.mjs';
import BaseModel from './base.model.mjs';

class Note extends BaseModel {
    #tableName = 'notes';
    #new = true;

    constructor(user_hash, hash_code='') {
        super(hash_code);
        this.content = '';
        this.title = '';
        this.user_hash = user_hash;
    }

    /**
     * Fetches the attribute of the instance based on this.hash_code
     * And updates the instance attributes
     */
    async setInstanceAttributes() {
        const response = {
            error: false,
            message: 'success',
            data: []
        }
        try {
            if (!this.hash_valid()) {
                throw Error('Invalid note hash code');
            }
            const query = `SELECT * FROM ${this.#tableName} WHERE \`hash_code\`=? AND user_hash=?`;
            const result = await queryDB(query, [this.hash_code,, this.user_hash]);
            if (!result || result.error) {
                throw Error(result.message);
            } 
            this.title = result.data[0].title;
            this.content = result.data[0].content;
            this.#new = false;
        } catch (e) {
            response.message = e.message;
            response.error = true;
        }
        return response;
    }
    
    /**
     * Checks if the instance is OK for saving
     * The instance needs to have a valid email to be OK for saving
     */
    #validate() {
        if (!this.title) {
            throw Error('Invalid or empty note title');
        } else if (!this.content) {
            throw Error('Invalid or empty note content');
        } else if (!this.hash_valid(this.user_hash)) {
            throw Error('Invalid user hash code');
        }
    }

    /**
     * Saves an instance to the database
     */
    async save() {
        const response = {
            error: false,
            message: 'success',
            data: [
                {
                    hash_code: this.hash_code,
                    title: this.title,
                    content: this.content,
                    user_hash: this.user_hash
                }
            ]
        }
        try {
            this.#validate();
            if (this.#new) {
                await this.#saveNew();
            } else {
                await this.#update();
            }
        } catch (e) {
            response.message = e.message;
            response.error = true;
            response.data = [];
        }

        return response;

    }

    /**
     * Updates an instance's data in database
     */
    async #update() {
        const query = "UPDATE notes SET title=?, content=? WHERE hash_code=? AND user_hash=?";
        const response = await queryDB(query, [this.title, this.content, this.hash_code, this.user_hash]);
        if (response.error) {
            throw Error(response.message)
        }
    }

    /**
     * Saves a new instance to the database
     */
    async #saveNew() {
        const query = "INSERT INTO notes (hash_code, title, content, user_hash) VALUES (?,?,?,?)";
        const response = await queryDB(query, [this.hash_code, this.title, this.content, this.user_hash]);
        if (response.error) {
            throw Error(response.message);
        }
    }

    /**
     * Deletes the instance from the database
     * but doesn't destroy the instance.
     * A call to save on this instance after calling delete 
     * creates a new row in the database
     */
    async delete() {
        const query = "DELETE FROM notes WHERE hash_code=? AND user_hash=?";
        const response = await queryDB(query, [this.hash_code, this.user_hash]);
        if (!response.error) this.#new = true; // If no error occured then mark instance as new record
        response.data = [];
        return response;
    }
}

export default Note;