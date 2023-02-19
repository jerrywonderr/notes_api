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

export async function queryDB(query, params) {
    const response = {
        error: false,
        data: [],
        message: 'success'
    }
    try {
        const client = pool();
        const result = await client.execute(query, params);
        // console.log(result);
        response.data = result[0];
    } catch (e) {
        console.log(e.sqlMessage);
        response.error = true;
        response.message = e.sqlMessage;
    }

    return response;
}

export default pool;