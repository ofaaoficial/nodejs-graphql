// Configuracion de resolvers
'use strict';

const courses = [
    {
        _id: 'anyId',
        title: "Web fullstack",
        teacher: "Oscar Amado",
        description: "Curso de desarrollo web",
        topic: "Desarrollo web"
    },
    {
        _id: 'anyId',
        title: "Web fullstack 1",
        teacher: "Oscar Amado",
        description: "Curso de desarrollo web",
        topic: "Desarrollo web"
    },
    {
        _id: 'anyId',
        title: "Web fullstack 2",
        teacher: "Oscar Amado",
        description: "Curso de desarrollo web",
        topic: "Desarrollo web"
    },
];

module.exports = {
    getCourses: () => courses
};
