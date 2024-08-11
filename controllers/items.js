import { client } from '../server.js';

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


export async function insertItems(items) {
    try {
        const database = client.db('unifrontDB');
        const collection = database.collection("items");


        // This is to remove the id field and only have the default mongoDB _id
        const modifiedDocuments = []

        items.forEach(item => {
            let obj = {};
            Object.keys(item).forEach(key => {
                if (key !== 'id') {
                    obj[key] = item[key];
                }
            });
            modifiedDocuments.push(obj);
        });



        const result = await collection.insertMany(modifiedDocuments);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch {
        console.dir();
    }
}

export async function insertItem(item) {
    try {
        const database = client.db('unifrontDB');
        const collection = database.collection("items");

        const result = await collection.insertOne(item);
    } catch {
        console.dir();
    }
}

export async function insertCategories(categories) {
    try {
        const database = client.db('unifrontDB');
        const collection = database.collection("categories");

        const modifiedDocuments = categories.map(category => {
            let obj = {};
            Object.keys(category).forEach(key => {
                if (key !== 'id') {
                    obj[key] = category[key];
                }
            });
            return obj;
        });


        const result = await collection.insertMany(modifiedDocuments);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch {
        console.dir();
    }
}
