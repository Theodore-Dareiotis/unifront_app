import express from 'express';
import * as usersControllers from '../controllers/users.js';
import * as itemsControllers from '../controllers/items.js';
import * as inventoryControllers from '../controllers/inventory.js';
import * as announcementControllers from '../controllers/announcements.js';
import * as mapControllers from '../controllers/map.js';

const rescuerRouter = express.Router();


rescuerRouter.get('/', async (req, res) => {
    try {
        const username = req.session.user;
        const categories = await itemsControllers.getCategories();
        res.render('rescuer/index', { username, categories });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

rescuerRouter.get('/getCargo', async (req, res) => {
    try {
        const cargo = await inventoryControllers.getInventoryByRescuer(req.session.userId);
        res.status(200).json(cargo);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

rescuerRouter.get('/getBaseInventory', async (req, res) => {
    try {
        const inventory = await inventoryControllers.getInventoryByRescuer(1);
        res.status(200).json(inventory);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

rescuerRouter.post('/loadItems', async (req, res) => {
    try {
        const items = req.body;
        await inventoryControllers.loadVehicle(items, req.session.userId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default rescuerRouter;