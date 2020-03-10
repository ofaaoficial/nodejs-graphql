// Resolvers para los tipos.
'use strict';

const connectDB = require('./db');
const {ObjectID} = require('mongodb');

module.exports = {
    Course: {
        people: async ({people}) => {
            let db, peopleData, ids;

            try {
                db = await connectDB();
                ids = people ? people.map(id => ObjectID(id)) : [];
                peopleData = ids.length > 0 ?
                    await db.collection('students').find(
                        {_id: {$in: ids}}
                    ).toArray() : [];
            } catch (err) {
                console.log(err);
            }

            return peopleData;
        }
    }
};