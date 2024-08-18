import { pool } from "../server.js"

export async function getUser(username, password) {
    try {
        const sql = 'SELECT * FROM user where username=? AND password=?';

        const [rows, fields] = await pool.execute(sql, [username, password]);

        return rows[0];
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}