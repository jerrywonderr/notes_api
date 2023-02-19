import BaseModel from './base.model.mjs';
import { queryDB } from '../db/db.mjs';

class User extends BaseModel{
    // Create user
    // authenticate user
    // Get user
    // Delete user
    // Update user

    #tableName = 'users';
    #new = true; // Flag to determine if the instance is a new one or not, default true
    #email = '';

    constructor(hash_code='') {
        super(hash_code);
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
                throw Error('Invalid user hash code');
            }
            const query = `SELECT * FROM ${this.#tableName} WHERE \`hash_code\`=?`;
            const result = await queryDB(query, [this.hash_code]);
            if (!result || result.error) {
                throw Error(result.message);
            } 
            this.email = result.data[0].email;
            this.#new = false;
        } catch (e) {
            response.message = e.message;
            response.error = true;
        }
        return response;
    }

    async get(hash) {
        const query = "GET * FROM `users`;";
        response = await queryDB(query);
        console.log(response);
    }

    /**
     * Checks if the instance is OK for saving
     * The instance needs to have a valid email to be OK for saving
     */
    #validate() {
        if (!this.email) {
            throw Error('Invalid or empty email address');
        }
    }

    /**
     * Saves an instance to the database
     */
    async save() {
        const response = {
            error: false,
            message: 'success',
            data: []
        }
        try {
            this.#validate();
            if (this.#new) {
                await this.#saveNew();
            } else {
                this.#update();
            }
        } catch (e) {
            response.message = e.message;
            response.error = true;
        }

        return response;

    }

    /**
     * Updates an instances data in database
     */
    async #update() {
        const query = "UPDATE ? SET email=? WHERE hash_code=?";
        const response = await queryDB(query, [this.#tableName, this.#email, this.hash_code]);
        if (response.error) {
            throw Error(response.message)
        }
    }

    /**
     * Saves a new instance to the database
     */
    async #saveNew() {
        const query = "INSERT INTO users (hash_code, email) VALUES (?,?)";
        const response = await queryDB(query, [this.hash_code, this.#email]);
        if (response.error) {
            throw Error(response.message)
        }
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        if (email) {
            this.#email = email;
        }
    }
}

export default User;