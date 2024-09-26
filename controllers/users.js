import { pool } from "../server.js"

export async function getUser(username, password) {
    try {
        const sql = 'SELECT * FROM user where username=? AND password=?';

        const [rows, fields] = await pool.execute(sql, [username, password]);

        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

export async function registerUser(user) {
    try {
        const sql = 'INSERT INTO user (email, username, password, user_type, phone, name, surname) VALUES (?, ?, ?, ?, ?, ?, ?)';
        console.log(Object.values(user));
        const [results] = await pool.execute(sql, Object.values(user));
        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function registerCitizen(user) {
    try {
        const sql = 'INSERT INTO user (email, username, password, user_type, phone, name, surname) VALUES (?, ?, ?, ?, ?, ?, ?)';
        console.log(Object.values(user));
        const [results] = await pool.execute(sql, Object.values(user));
        return results;
    } catch (error) {
        console.log(error);
    }
}