'use strict';

const connectDB = require('./db');

module.exports = {
    createCourse: async (root, {input}) => {
        let db, course, defaults = {
            teacher: '',
            topic: ''
        };

        const newCourse = {...defaults, ...input};

        try {
            db = await connectDB();
            course = await db.collection('nodejs-graphql').insertOne(newCourse);
            newCourse._id = course.insertedId;
        } catch (e) {
            console.log(e);
        }

        return newCourse;
    }
};
