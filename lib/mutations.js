'use strict';

const connectDB = require('./db');
const {ObjectID} = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
    createCourse: async (root, {input}) => {
        let db, course, defaults = {
            teacher: '',
            topic: ''
        };

        const newCourse = {...defaults, ...input};

        try {
            db = await connectDB();
            course = await db.collection('courses').insertOne(newCourse);
            newCourse._id = course.insertedId;
        } catch (err) {
            errorHandler(err);
        }

        return newCourse;
    },
    updateCourse: async (root, {id, input}) => {
        let db, course;

        try {
            db = await connectDB();

            await db.collection('courses').updateOne({
                _id: ObjectID(id)
            }, {$set: input});

            course = await db.collection('courses').findOne({
                _id: ObjectID(id)
            });
        } catch (err) {
            errorHandler(err);
        }

        return course;
    },
    deleteCourse: async (root, {id}) => {
        let db, course;

        try {
            db = await connectDB();

            course = await db.collection('courses').findOne({
                _id: ObjectID(id)
            });

            await db.collection('courses').deleteOne({
                _id: ObjectID(id)
            });

        } catch (err) {
            errorHandler(err);
        }

        return course;
    },

    createPerson: async (root, {input}) => {
        let db, student, defaults = {
            email: ''
        };

        const newStudent = {...defaults, ...input};

        try {
            db = await connectDB();
            student = await db.collection('students').insertOne(newStudent);
            newStudent._id = student.insertedId;
        } catch (err) {
            errorHandler(err);
        }

        return newStudent;
    },
    updatePerson: async (root, {id, input}) => {
        let db, student;

        try {
            db = await connectDB();

            await db.collection('students').updateOne({
                _id: ObjectID(id)
            }, {$set: input});

            student = await db.collection('students').findOne({
                _id: ObjectID(id)
            });
        } catch (err) {
            errorHandler(err);
        }

        return student;
    },
    deletePerson: async (root, {id}) => {
        let db, student;

        try {
            db = await connectDB();

            student = await db.collection('students').findOne({
                _id: ObjectID(id)
            });

            await db.collection('students').deleteOne({
                _id: ObjectID(id)
            });

        } catch (err) {
            errorHandler(err);
        }

        return student;
    },

    addPersonToCourse: async (root, {courseID, studentID}) => {
        let db, course, student;

        try {
            db = await connectDB();
            course = await db.collection('courses').findOne({
                _id: ObjectID(courseID)
            });
            student = await db.collection('students').findOne({
                _id: ObjectID(studentID)
            });
            if (!course || !student) throw new Error('La persona o el curso no existe.');

            await db.collection('courses').updateOne(
                {_id: ObjectID(courseID)},
                {$addToSet: {people: ObjectID(studentID)}}
            );
        } catch (err) {
            errorHandler(err);
        }

        return course;
    }
};
