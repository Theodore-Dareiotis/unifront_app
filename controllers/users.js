import { client } from '../index';
//pass as argument or import client?

async function register(newUser) {
    try {

        const database = client.db("recoop")
        const users = database.collection("users");

        const result = await users.insertOne(newUser);
    } catch (error) {
        console.log(error);
    }
};