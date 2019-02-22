const express = require('express');
const route = express.Router();

const db = require('../data/dbConfig.js')

route.get('/', async (req, res) => {
    try {
        const projects = await db('projects')
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json(error)
    }
});

route.get('/:id', async (req, res) => {
    try {
        const project = await db('projects').where({id: req.params.id}).first();
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json(error)
    }
})

route.post('/', async (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({message: "Please provide project name and description."})
    } else {
        try {
            const id = await db('projects').insert(req.body);
            const newProject = await db('projects').where({id}).first();
            res.status(200).json({message: "success", newProject})
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

module.exports = route;