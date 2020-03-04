'use strict';

const connectDB = require('./db');
const {ObjectID} = require('mongodb');

module.exports = {
    getCourses: async () => {
        let courses = [], db;

        try {
            db = await connectDB();
            courses = await db.collection('nodejs-graphql').find().toArray();
        } catch (err) {
            console.log(err);
        }

        return courses;
    },
    getCourse: async (root, args) => {
        let course, db;
        const {id} = args;

        try {
            db = await connectDB();
            course = await db.collection('nodejs-graphql').findOne({_id: ObjectID(id)});
        } catch (err) {
            console.log(err);
        }

        return course;
    }
};
