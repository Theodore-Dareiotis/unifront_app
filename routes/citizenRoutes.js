import express from 'express';
import * as announcementControllers from '../controllers/announcements.js';
import * as itemsControllers from '../controllers/items.js';
import * as offerControllers from '../controllers/offers.js';
import * as requestControllers from '../controllers/requests.js';
import * as inventoryControllers from '../controllers/inventory.js';

const citizenRouter = express.Router();

citizenRouter.get('/', async (req, res) => {
    try {
        const username = req.session.user;
        const categories = await itemsControllers.getCategories();
        res.render('citizen/index', { username, categories });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

citizenRouter.get('/getAnnouncements', async (req, res) => {
    try {
        const announcements = await announcementControllers.getAnnouncements();
        res.status(200).json(announcements);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

citizenRouter.get('/getOffers', async (req, res) => {
    try {
        const offers = await offerControllers.getOffers(req.session.userId);
        res.status(200).json(offers);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

citizenRouter.post('/createOffer', async (req, res) => {
    try {
        const items = req.body;
        await offerControllers.createOffer(items, req.session.userId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

citizenRouter.put('/cancelOffer/:offerId', async (req, res) => {
    try {
        const offerId = req.params.offerId;
        await offerControllers.cancelOffer(offerId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

citizenRouter.get('/getRequests', async (req, res) => {
    try {
        const requests = await requestControllers.getRequests(req.session.userId);
        res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

citizenRouter.put('/cancelRequest/:requestId', async (req, res) => {
    try {
        const requestId = req.params.requestId;
        await requestControllers.cancelRequest(requestId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

citizenRouter.post('/createRequest', async (req, res) => {
    try {
        const { items, peopleInNeed } = req.body;
        await requestControllers.createRequest(items, req.session.userId, peopleInNeed);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

citizenRouter.get('/getBaseInventory', async (req, res) => {
    try {
        const inventory = await inventoryControllers.getInventoryByRescuer(1);
        res.status(200).json(inventory);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default citizenRouter;