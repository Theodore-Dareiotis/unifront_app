import { pool } from '../server.js';

export async function getAnnouncements() {
    try {
        // sql = 'SELECT id AS announcementId, title, content, created_at AS date, item_id AS itemId FROM announcement JOIN announcement_has_item ON announcement_id = id ORDER BY id';

        const sql1 = 'SELECT a.id AS announcementId, ahi.item_id AS itemID, i.name AS itemName FROM announcement a JOIN announcement_has_item ahi ON a.id = ahi.announcement_id JOIN item i ON ahi.item_id = i.id ORDER BY a.id';

        const sql2 = 'SELECT id AS announcementId, title, content, created_at AS date FROM announcement ORDER BY id';

        const [items] = await pool.execute(sql1);
        const [announcements] = await pool.execute(sql2);

        const rows = [];
        let i = 0;
        for (const announcement of announcements) {
            const announcementItems = [];
            while (i < items.length && items[i].announcementId === announcement.announcementId) {
                announcementItems.push({
                    itemID: items[i].itemID,
                    itemName: items[i].itemName
                });
                i++;
            }
            rows.push({
                announcementId: announcement.announcementId,
                title: announcement.title,
                content: announcement.content,
                date: announcement.date,
                items: announcementItems,
            });
        }


        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function createAnnouncement(title, content, items) {
    try {
        const [result] = await pool.execute(
            'INSERT INTO announcement (title, content) VALUES (?, ?)',
            [title, content]
        );

        const announcementId = result.insertId;

        if (items && items.length > 0) {
            const itemValues = items.map(itemId => [announcementId, itemId]);
            await pool.query(
                'INSERT INTO announcement_has_item (announcement_id, item_id) VALUES ?',
                [itemValues]
            );
        }

        return result;
    } catch (error) {
        console.log(error);
    }
}