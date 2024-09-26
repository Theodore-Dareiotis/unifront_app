import { pool } from '../server.js';

export async function getInventory() {
    try {
        const sql = 'SELECT user_id AS rescuer, user.name AS rescuerName, item_id AS itemId, category_id AS categoryId, item.name AS itemName, category.name AS categoryName, quantity, details FROM item JOIN category ON category.id = category_id JOIN in_inventory ON item.id = item_id JOIN user ON user_id = user.id ORDER BY user_id;'

        const [rows] = await pool.execute(sql);

        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getInventoryByRescuer(rescuerId) {
    try {
        const sql = 'SELECT user_id AS rescuer, item_id AS itemId, category_id AS categoryId, item.name AS itemName, category.name AS categoryName, quantity, details FROM item JOIN category ON category.id = category_id JOIN in_inventory ON item.id = item_id JOIN user ON user_id = user.id WHERE user_id = ? ORDER BY user_id;'

        const [rows] = await pool.execute(sql, [rescuerId]);

        return rows;
    } catch (error) {
        console.log(error);
    }
}
export async function addToInventory(values) {
    try {

        const sql = 'INSERT INTO unifront.in_inventory (item_id, user_id, quantity) VALUES ? ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)';

        const [results] = await pool.query(sql, [values]);
    } catch (error) {
        console.log(error);
    }
}

export async function removeFromInventory(itemId, rescuerId) {
    try {
        const sql = 'DELETE FROM unifront.in_inventory WHERE item_id = ? AND user_id = ?;';

        const [results] = await pool.execute(sql, [itemId, rescuerId]);
    } catch (error) {
        console.log(error);
    }
}

