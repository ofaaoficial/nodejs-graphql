'use strict';

const {graphql, buildSchema} = require('graphql');

// Definicion de esquema

// Scalares por defecto String, Int, Float y Boolean.
const schema = buildSchema(`
    type Query {
        hello: String
        greeting: String
    }
`);

// Configuracion de resolvers

const resolvers = {
    hello: () => 'Hello world!',
    greeting: () => 'Hello everybody!',
};

// Ejecutando el query hello
graphql(schema, '{ hello greeting }', resolvers)
    .then(r => {
        console.log(r);
    });

