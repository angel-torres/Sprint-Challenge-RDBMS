const express = require('express');

const server = express();

const actionsRoute = require('./routes/actionsRoute.js')
const projectsRoute = require('./routes/projectsRoute.js')

server.use(express.json());

server.use('/api/actions', actionsRoute);
server.use('/api/projects', projectsRoute)

module.exports = server