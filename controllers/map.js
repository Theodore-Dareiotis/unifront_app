import { pool } from '../server.js';

export async function getOffers() {
    try {
        const sql1 =
            `SELECT offer.id, citizen.latitude AS lat, citizen.longitude AS lng, offer.citizen_id, citizen.name AS citizen_name, citizen.surname AS citizen_surname, citizen.phone AS citizen_phone, offer.status, offer.created_at, offer.updated_at, rescuer.name AS rescuer_name, rescuer.phone AS rescuer_phone
            FROM unifront.offer 
            JOIN user AS citizen ON offer.citizen_id = citizen.id
            LEFT JOIN user AS rescuer ON offer.assigned_rescuer_id = rescuer.id
            ORDER BY offer.id`;
        const [offers] = await pool.query(sql1);


        const sql2 =
            `SELECT offer_id, item_id, item.name, offer_has_item.quantity 
            FROM unifront.offer_has_item 
            JOIN unifront.offer ON offer_has_item.offer_id = offer.id 
            JOIN unifront.item ON offer_has_item.item_id = item.id 
            ORDER BY offer.id`;
        const [items] = await pool.query(sql2);

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
                location: {
                    lat: offer.lat,
                    lng: offer.lng
                },
                citizenId: offer.citizen_id,
                name: [offer.citizen_name, offer.citizen_surname].join(' '),
                phone: offer.citizen_phone,
                date: offer.created_at,
                updateDate: offer.updated_at,
                status: offer.status,
                rescuerId: offer.assigned_rescuer_id,
                rescuerName: offer.rescuer_name,
                rescuerPhone: offer.rescuer_phone,
                items: offerItems
            });
        }

        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getRequests() {
    try {
        const sql1 =
            `SELECT request.id, citizen.latitude AS lat, citizen.longitude AS lng, request.citizen_id, citizen.name AS citizen_name, citizen.surname AS citizen_surname, citizen.phone AS citizen_phone, request.people_in_need, request.status, request.created_at, request.updated_at, rescuer.name AS rescuer_name, rescuer.phone AS rescuer_phone
            FROM unifront.request 
            JOIN user AS citizen ON request.citizen_id = citizen.id
            LEFT JOIN user AS rescuer ON request.assigned_rescuer_id = rescuer.id
            ORDER BY request.id`;
        const [requests] = await pool.execute(sql1);


        const sql2 =
            `SELECT request_id, item_id, item.name 
            FROM unifront.request_has_item 
            JOIN unifront.request ON request_has_item.request_id = request.id 
            JOIN unifront.item ON request_has_item.item_id = item.id 
            ORDER BY request.id`;

        const [items] = await pool.execute(sql2);

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
                location: {
                    lat: request.lat,
                    lng: request.lng
                },
                citizenId: request.citizen_id,
                name: [request.citizen_name, request.citizen_surname].join(' '),
                phone: request.citizen_phone,
                peopleInNeed: request.people_in_need,
                date: request.created_at,
                updateDate: request.updated_at,
                status: request.status,
                rescuerId: request.assigned_rescuer_id,
                rescuerName: request.rescuer_name,
                rescuerPhone: request.rescuer_phone,
                items: requestItems
            });
        }

        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getVehicles() {
    try {
        const vehiclesSql = `
            SELECT id, username, latitude AS lat, longitude AS lng
            FROM user
            WHERE user_type = 'rescuer'
            ORDER BY id`;

        const [vehicles] = await pool.execute(vehiclesSql);

        const tasksSql = `
            SELECT 'request' AS type, r.id, r.assigned_rescuer_id, c.latitude AS lat, c.longitude AS lng
            FROM unifront.request AS r
            JOIN user AS c ON r.citizen_id = c.id
            WHERE r.status = 'accepted'
            UNION ALL
            SELECT 'offer' AS type, o.id, o.assigned_rescuer_id, c.latitude AS lat, c.longitude AS lng
            FROM unifront.offer AS o
            JOIN user AS c ON o.citizen_id = c.id
            WHERE o.status = 'accepted'
            ORDER BY assigned_rescuer_id`;

        const [tasks] = await pool.execute(tasksSql);



        const vehiclesWithTasks = [];
        let i = 0;
        for (const vehicle of vehicles) {
            const activeTasks = [];
            while (i < tasks.length && tasks[i].assigned_rescuer_id === vehicle.id) {
                activeTasks.push({
                    id: tasks[i].id,
                    type: tasks[i].type,
                    lat: tasks[i].lat,
                    lng: tasks[i].lng
                });
                i++;
            }
            vehiclesWithTasks.push({
                id: vehicle.id,
                username: vehicle.username,
                lat: vehicle.lat,
                lng: vehicle.lng,
                activeTasks: activeTasks
            });
        }

        return vehiclesWithTasks;
    } catch (error) {
        console.log(error);
    }
}

export async function updateBaseLocation(lat, lng) {
    try {
        const sql = `UPDATE user SET latitude = ?, longitude = ? WHERE id = 1`;
        const [result] = await pool.execute(sql, [lat, lng]);
        return result;
    } catch (error) {
        console.log(error);
    }
}

