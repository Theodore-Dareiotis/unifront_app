import { pool } from '../server.js';

export async function getOffers(citizenId) {
    try {
        const sql1 = 'SELECT * FROM unifront.offer WHERE citizen_id = ? ORDER BY offer.id';
        const [offers] = await pool.query(sql1, [citizenId]);


        const sql2 = 'SELECT offer_id, item_id, item.name, offer_has_item.quantity FROM unifront.offer_has_item JOIN unifront.offer ON offer_has_item.offer_id = offer.id JOIN unifront.item ON offer_has_item.item_id = item.id WHERE offer.citizen_id = ? ORDER BY offer.id';
        const [items] = await pool.query(sql2, [citizenId]);

        const rows = [];
        let i = 0;
        for (const offer of offers) {
            const offerItems = [];
            while (i < items.length && items[i].offer_id === offer.id) {
                offerItems.push({
                    itemId: items[i].item_id,
                    itemName: items[i].name,
                    quantity: items[i].quantity
                });
                i++;
            }
            rows.push({
                offerId: offer.id,
                citizenId: offer.citizen_id,
                date: offer.created_at,
                updateDate: offer.updated_at,
                status: offer.status,
                items: offerItems
            });
        }

        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function createOffer(items, citizenId) {
    try {
        const sql1 = 'INSERT INTO unifront.offer (citizen_id) VALUES (?)';

        const [results1] = await pool.query(sql1, [citizenId]);
        const offerId = results1.insertId;

        const sql2 = 'INSERT INTO unifront.offer_has_item (offer_id, item_id, quantity) VALUES ?';
        const values = items.map(item => [
            offerId,
            item.itemId,
            item.quantity
        ]);

        const [results2] = await pool.query(sql2, [values]);

        return results2;

    } catch (error) {
        console.log(error);
    }
}

export async function cancelOffer(offerId) {
    try {
        const sql = 'UPDATE unifront.offer SET status = "cancelled" WHERE id = ?';
        const [results] = await pool.query(sql, [offerId]);
        return results;
    } catch (error) {
        console.log(error);
    }
}