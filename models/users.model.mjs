import { response } from 'express';
import pool from '../db/db.mjs';
import { v4 as uuidv4, validate } from 'uuid';

class User {
    // Create user
    // authenticate user
    // Get user
    // Delete user
    // Update user

    constructor(hash_code='') {
        this.client = pool();
        this.hash_code = hash;
        this.setupUserInstance();
    }

    setupUserInstance() {
        if (this.hash_valid(this.hash_code)) {
            this.updateInstanceAttributes();
        } else {
            this.instantiateNewUser();
        }
    }

    /**
     * Creates an empty user instance
     * This instance cannot be saved until a valid email is added to user attributes
     */
    instantiateNewUser() {
        this.hash_code = v4();
        this.email = '';
    }

    /**
     * Updates the attribute of the instance but doesn't save it to the database
     */
    async updateInstanceAttributes() {
        const query = "SELECT * FROM `users` WHERE `hash_code`=?";
        const user = await this.client.execute(query, [this.hash]);
        console.log(user);
    }

    async get(hash) {
        const query = "GET * FROM `users`;";
        response = await this.client.query(query);
        console.log(response);
    }

    /**
     * Checks if hash_code of instance is valid
     * 
     * @returns true if hash_code is valid else false
     */
    hash_valid() {
        return validate(this.hash_code);
    }
}

export default User;