import BaseModel from './base.model.mjs';
import { queryDB } from '../db/db.mjs';
import { hashMatch, hashString } from '../helpers/index.mjs';

class User extends BaseModel{

    #tableName = 'users';
    #new = true; // Flag to determine if the instance is a new one or not, default true
    #email = '';
    #pass = '';
    #hashedPass = '';

    constructor(hash_code='', password='') {
        super(hash_code);
        this.#pass = password;
    }

    /**
     * Fetches the attribute of the instance based on `this.hash_code`
     * And updates the instance attributes
     */
    async setInstanceAttributes(by='', value='') {
        const response = {
            error: false,
            message: 'success',
            data: []
        }
        try {
            by = by ? by : 'hash_code';
            if (!this.hash_valid()) {
                throw Error('Invalid user hash code');
            }
            const query = `SELECT email, pass, hash_code FROM ${this.#tableName} WHERE ${by}=?`;
            const result = await queryDB(query, [value]);
            if (result.data[0] == 0 || result.error) {
                throw Error('User not found');
            } 
            this.email = result.data[0].email;
            this.#hashedPass = result.data[0].pass;
            this.hash_code = result.data[0].hash_code;
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
        if (!this.email) {
            throw Error('Invalid or empty email address');
        }

        if (!this.#hashedPass || (this.new && !this.pass)) {
            throw Error('Invalid or empty password set for user');
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
     * Updates an instances data in database, doesn't update the password
     */
    async #update() {
        const query = "UPDATE users SET email=? WHERE hash_code=?";
        const response = await queryDB(query, [this.#email, this.hash_code]);
        if (response.error) {
            throw Error(response.message);
        }
    }

    /**
     * Saves a new instance to the database
     */
    async #saveNew() {
        const query = "INSERT INTO users (hash_code, email, pass) VALUES (?,?,?)";
        const response = await queryDB(query, [this.hash_code, this.#email, this.#hashedPass]);
        if (response.error) {
            throw Error(response.message);
        }
    }

    /**
     * Sets up the user instance for saving by creating the hashed version of the user's password
     */
    async setUpPassword() {
        try {
            if (this.#pass) this.#hashedPass = await hashString(this.#pass);
        } catch (err)  {
            // Do nothing
        };      
    }

    /**
     * Verifies that the proposed password matches the user's password
     * @param {string} password the proposed password
     * @returns {Promise<boolean>} true if "password" correlates 
     *                             to user's password else false
     */
    async verify(password) {
        return await hashMatch(password, this.#hashedPass);
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