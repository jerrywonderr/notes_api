import mysql from 'mysql2/promise';

/**
 * Gets a client from a connection pool to the database
 * @returns (pool) A client from a connection pool
 */
const pool = () => mysql.createPool({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    database: process.env['DB_NAME'],
    password: process.env['DB_PASS'],
    port: process.env['DB_PORT'],
    waitForConnections: true,
    connectionLimit: 10,
});

/**
 * 
 * @param {string} query the query to be executed
 * @param {Array} params an array of params to be subsituted into the query string
 * @returns an object of the form
 * `{
        error: boolean,
        data: Array,
        message: string
    }`
 */
export async function queryDB(query, params) {
    const response = {
        error: false,
        data: [],
        message: 'success'
    }
    try {
        const client = pool();
        const result = await client.execute(query, params);
        response.data = result[0];
    } catch (e) {
        response.error = true;
        response.message = e.sqlMessage;
    }

    return response;
}

export default pool;