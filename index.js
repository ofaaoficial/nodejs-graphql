'use strict';

const {graphql, buildSchema} = require('graphql');
const express = require('express');
const gqlMiddleware = require('express-graphql');


const app = express();
const port = process.env.PORT || 3000;

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
// graphql(schema, '{ hello greeting }', resolvers)
//     .then(r => {
//         console.log(r);
//     });

app.use('/api', gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Server running at http://localhost:${port}/api`);
});
