import { v4, validate } from "uuid";

class BaseModel {
    #instance_hash = '';

    constructor(hash_code='') {
        this.hash_code = hash_code ? hash_code : v4();
    }

    get hash_code() {
        return this.#instance_hash;
    }

    set hash_code(hash_code) {
        if (this.hash_valid(hash_code)) {
            this.#instance_hash = hash_code;
        }
    }

    /**
     * Checks if hash_code of instance is valid
     * 
     * @returns true if hash_code is valid else false
     */
    hash_valid(hash_code='') {
        return validate(hash_code ? hash_code : this.hash_code);
    }
}

export default BaseModel;