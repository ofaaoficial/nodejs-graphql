// Configuracion de resolvers
'use strict';

const courses = [
    {
        _id: '1',
        title: "Web fullstack",
        teacher: "Oscar Amado",
        description: "Curso de desarrollo web",
        topic: "Desarrollo web"
    },
    {
        _id: '2',
        title: "Web fullstack 1",
        teacher: "Oscar Amado",
        description: "Curso de desarrollo web",
        topic: "Desarrollo web"
    },
    {
        _id: '3',
        title: "Web fullstack 2",
        teacher: "Oscar Amado",
        description: "Curso de desarrollo web",
        topic: "Desarrollo web"
    },
];

module.exports = {
    Query : {
        getCourses: () => courses,
        getCourse: (root, args) => courses.find(course => course._id === args.id)
    }
};
