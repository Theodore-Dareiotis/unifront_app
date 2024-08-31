import { pool } from '../server.js';

const url = 'http://usidas.ceid.upatras.gr/web/2023/export.php'

export const fetchFromCeid = async () =>
    await fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`status: ${response.status}`);
        }
        return response.json();
    })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });


export function initItems(items) {
    try {

        const sql = 'INSERT INTO unifront.item (id, name,category_id, details) VALUES ?';

        // from docs: Nested arrays are turned into grouped lists (for bulk inserts), e.g. [['a', 'b'], ['c', 'd']] turns into ('a', 'b'), ('c', 'd')
        const array = items.map(item => [
            item.id,
            item.name,
            item.category,
            JSON.stringify(item.details)
        ]);

        pool.query(sql, [array], (error, results, fields) => {
            if (error) throw error;
            console.log(`Affected rows: ${results.affectedRows}`);
        });

    } catch {
        console.dir();
    }
}

export async function getCatalogue() {
    try {
        const sql = 'SELECT item.id AS id, item.name AS name, details, category.name AS category_name, category_id FROM item JOIN category ON item.category_id = category.id;'

        const [rows, fields] = await pool.execute(sql);

        return rows;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function getItemById(itemId) {
    try {
        const sql = 'SELECT * FROM unifront.item WHERE id = ?';

        const [rows] = await pool.execute(sql, [itemId]);

        return rows[0];
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
}

export async function updateItem(itemId, item) {
    try {
        const sql = 'UPDATE unifront.item SET name = ?, category_id = ?, details = ? WHERE id = ?';
        console.log(item);
        const [results] = await pool.execute(sql, [item.name, item.categoryId, JSON.stringify(item.details), itemId]);

        return results;
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
}

export async function insertItem(item) {
    try {
        const sql = 'INSERT INTO unifront.item (name, category_id, details) VALUES (?, ?, ?)';

        const [results, fields] = await pool.execute(sql, [item.name, item.categoryId, JSON.stringify(item.details)]);

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteItem(itemId) {
    try {
        const sql = 'DELETE FROM unifront.item WHERE id = ?';
        const [results] = await pool.execute(sql, [itemId]);
        return results;
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
}

export async function getCategories() {
    try {
        const sql = 'SELECT * FROM unifront.category';

        const [rows, fields] = await pool.execute(sql);

        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function insertCategory(categoryName) {
    try {
        const sql = 'INSERT INTO unifront.category (name) VALUES (?)';

        const [results] = await pool.execute(sql, categoryName);

        return rows;
    } catch (error) {
        console.log(error);
    }
}


export async function initCategories(categories) {
    try {
        const sql = 'INSERT INTO unifront.category (id, name) VALUES ?';

        const array = categories.map(category => [
            category.id,
            category.category_name
        ]);

        const [result, fields] = await pool.execute(sql, [array]);


    } catch (error) {
        console.log(error);
    }
}
