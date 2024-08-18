import express from 'express';
import { isAdmin } from '../middleware/authenticationMiddleware.js';
import { getCatalogue, getCategories } from '../controllers/items.js';

const adminRouter = express.Router();

adminRouter.get('/catalogue', async (req, res) => {

    //fetch categories and items
    const items = await getCatalogue();
    const categories = await getCategories();
    console.log(categories);

    res.render('admin/catalogue', { categories, items });
});

export default adminRouter;