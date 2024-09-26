import { pool } from '../server.js';


export async function getRequests(citizenId) {
    try {
        const sql1 = 'SELECT * FROM unifront.request WHERE citizen_id = ? ORDER BY request.id';
        const [requests] = await pool.execute(sql1, [citizenId]);


        const sql2 = 'SELECT request_id, item_id, item.name FROM unifront.request_has_item JOIN unifront.request ON request_has_item.request_id = request.id JOIN unifront.item ON request_has_item.item_id = item.id WHERE request.citizen_id = ? ORDER BY request.id';

        const [items] = await pool.execute(sql2, [citizenId]);

        const rows = [];
        let i = 0;
        for (const request of requests) {
            const requestItems = [];
            while (i < items.length && items[i].request_id === request.id) {
                requestItems.push({
                    itemId: items[i].item_id,
                    itemName: items[i].name,
                });
                i++;
            }
            rows.push({
                requestId: request.id,
                peopleInNeed: request.people_in_need,
                date: request.created_at,
                updateDate: request.updated_at,
                status: request.status,
                items: requestItems
            });
        }

        return rows;
    } catch (error) {
        console.log(error);
    }
}

//TODO:find how implement transactions
export async function createRequest(items, citizenId, peopleInNeed) {
    try {
        const sql1 = 'INSERT INTO unifront.request (citizen_id, people_in_need) VALUES (?, ?)';

        const [results1] = await pool.query(sql1, [citizenId, peopleInNeed]);
        const requestId = results1.insertId;

        const sql2 = 'INSERT INTO unifront.request_has_item (request_id, item_id) VALUES ?';
        const values = items.map(itemId => [
            requestId,
            itemId,
        ]);

        const [results2] = await pool.query(sql2, [values]);

        return results2;

    } catch (error) {
        console.log(error);
    }
}

export async function cancelRequest(requestId) {
    try {
        const sql = 'UPDATE unifront.request SET status = "cancelled" WHERE id = ?';
        const [results] = await pool.query(sql, [requestId]);
        return results;
    } catch (error) {
        console.log(error);
    }
}
