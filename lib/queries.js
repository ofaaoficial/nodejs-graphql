'use strict';

const connectDB = require('./db');
const {ObjectID} = require('mongodb');

module.exports = {
    getCourses: async () => {
        let courses = [], db;

        try {
            db = await connectDB();
            courses = await db.collection('courses').find().toArray();
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
            course = await db.collection('courses').findOne({_id: ObjectID(id)});
        } catch (err) {
            console.log(err);
        }

        return course;
    },

    getStudents: async (root, args) => {
        let students, db;
        try {
            db = await connectDB();
            students = await db.collection('students').find().toArray(0);
        } catch (err) {
            console.log(err);
        }

        return students
    },
    getStudent: async (root, args) => {
        let student, db;
        const {id} = args;
        try {
            db = await connectDB();
            student = await db.collection('student').findOne({_id: ObjectID(id)});
        } catch (err) {
            console.log(err)
        }
        return student;
    }
};
