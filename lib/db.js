'use strict';

const {MongoClient} = require('mongodb');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_ENV
} = process.env;


const mongoUrl = DB_ENV === 'local' ? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}` : `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
console.log(mongoUrl);
let connection = false;

async function setConnection() {
    if (connection) return connection;

    let client;
    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        connection = client.db(DB_NAME);
        return connection;
    } catch (err) {
        console.log(err, mongoUrl);
        process.exit(1);
    }
}

module.exports = setConnection;
