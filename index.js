'use strict';

const {graphql, buildSchema} = require('graphql');

// Definicion de esquema

// Scalares por defecto String, Int, Float y Boolean.
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Ejecutando el query hello
graphql(schema, '{ hello }')
    .then(r => {
        console.log(r);
    });

