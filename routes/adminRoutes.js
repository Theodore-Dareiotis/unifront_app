import express from 'express';
import * as usersControllers from '../controllers/users.js';
import * as itemsControllers from '../controllers/items.js';
import * as inventoryControllers from '../controllers/inventory.js';
import * as announcementControllers from '../controllers/announcements.js';
import * as mapControllers from '../controllers/map.js';

const adminRouter = express.Router();

adminRouter.get('/', async (req, res) => {
    try {
        const categories = await itemsControllers.getCategories();

        res.render('admin/index', { categories });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

adminRouter.get('/getCatalogue', async (req, res) => {
    try {
        const catalogue = await itemsControllers.getCatalogue();

        res.status(200).json(catalogue);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

adminRouter.get('/catalogue', async (req, res) => {
    try {
        const items = await itemsControllers.getCatalogue();
        const categories = await itemsControllers.getCategories();

        res.render('admin/catalogue', { categories, items });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

adminRouter.post('/createItem', async (req, res) => {
    try {
        const newItem = req.body;
        console.log(req.body);
        const result = await itemsControllers.insertItem(newItem);
        console.log(result);
        res.status(201).json(result.insertId);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

adminRouter.delete('/deleteItem/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        await itemsControllers.deleteItem(itemId);
        res.status(200).json('Item deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Error deleting item');
    }
});

adminRouter.get('/getItem/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await itemsControllers.getItemById(itemId);
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching item' });
    }
});

adminRouter.put('/updateItem/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = req.body;
        await itemsControllers.updateItem(itemId, updatedItem);
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating item' });
    }
});

adminRouter.post('/createCategory', async (req, res) => {
    try {
        const itemId = req.params.id;
        const newCategory = req.body;
        await itemsControllers.insertCategory(newCategory);
        res.status(200).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category' });
    }
});

adminRouter.get('/getInventory', async (req, res) => {
    try {
        const inventory = await inventoryControllers.getInventory();
        res.status(200).json(inventory);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

adminRouter.post('/addToBaseInventory', async (req, res) => {
    try {
        const items = req.body;
        const values = items.map(item => [item.itemId, 1, item.quantity]);
        await inventoryControllers.addToInventory(values);
        res.status(200).json({ message: 'Items inserted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error inserting items' });
    }
});

adminRouter.delete('/removeFromBaseInventory', async (req, res) => {
    try {
        const itemId = req.query.itemId;
        const rescuerId = req.query.rescuerId;
        await inventoryControllersControllers.removeFromInventory(itemId, rescuerId);
        res.status(200).json({ message: 'Item removed from base inventory' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing item' });
    }
});

adminRouter.post('/registerRescuer', async (req, res) => {
    try {
        const rescuer = req.body;
        await usersControllers.registerUser(rescuer);
        res.status(200).json({ message: 'Rescuer account registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating account' });
    }

});

adminRouter.post('/createAnnouncement', async (req, res) => {
    try {
        const { title, content, items } = req.body;
        console.log(items);
        const result = await announcementControllers.createAnnouncement(title, content, items);
        res.status(200).json({ message: 'Announcement created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating announcement' });
    }
});

adminRouter.get('/getMapData', async (req, res) => {
    try {
        const vehicles = await mapControllers.getVehicles();
        const requests = await mapControllers.getRequests();
        const offers = await mapControllers.getOffers();

        res.json({ vehicles, requests, offers });
    } catch (error) {
        console.error('Error fetching map data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

adminRouter.put('/updateBaseLocation', async (req, res) => {
    try {
        const { lat, lng } = req.body;
        await mapControllers.updateBaseLocation(lat, lng);
        res.status(200).json({ message: 'Base location updated successfully' });
    } catch (error) {
        console.error('Error updating base location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default adminRouter;