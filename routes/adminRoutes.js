import express from 'express';
import { isAdmin } from '../middleware/authenticationMiddleware.js';
import * as itemsControllers from '../controllers/items.js';
import * as inventoryControllers from '../controllers/inventory.js';

const adminRouter = express.Router();

adminRouter.get('/', async (req, res) => {
    try {
        const categories = await itemsControllers.getCategories();

        res.render('admin/index', { categories });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

adminRouter.get('/catalogue', async (req, res) => {
    try {
        const items = await itemsControllers.getCatalogue();
        const categories = await itemsControllers.getCategories();
        //const selectedCategory = req.query.category || '';

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

export default adminRouter;