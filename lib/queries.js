'use strict';

const connectDB = require('./db');
const {ObjectID} = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
    getCourses: async () => {
        let courses = [], db;

        try {
            db = await connectDB();
            courses = await db.collection('courses').find().toArray();
        } catch (err) {
            errorHandler(err);
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

    getPeople: async (root, args) => {
        let students, db;
        try {
            db = await connectDB();
            students = await db.collection('students').find().toArray(0);
        } catch (err) {
            errorHandler(err);
        }

        return students
    },
    getPerson: async (root, {id}) => {
        let student, db;
        try {
            db = await connectDB();
            student = await db.collection('students').findOne({_id: ObjectID(id)});
        } catch (err) {
            errorHandler(err);
        }
        return student;
    },
    searchItems: async (root, {keyword}) => {
        let db, courses, people;
        try {
            db = await connectDB();
            courses = await db.collection('courses').find({
                $text: {$search: keyword}
            }).toArray();
            people = await db.collection('students').find({
                $text: {$search: keyword}
            }).toArray();
        } catch (err) {
            errorHandler(err);
        }
        return [...courses, ...people];
    },

};
