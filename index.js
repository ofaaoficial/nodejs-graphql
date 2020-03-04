'use strict';

const {makeExecutableSchema} = require('graphql-tools');
const express = require('express');
const gqlMiddleware = require('express-graphql');

const app = express();
const port = process.env.PORT || 3000;

const {readFileSync} = require('fs');
const {join} = require('path');
const resolvers = require('./lib/resolvers');

// Definicion de esquema

// Scalares por defecto String, Int, Float y Boolean.

const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
);

// Leear esquemas de archivos independientes '.graphql'
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

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
