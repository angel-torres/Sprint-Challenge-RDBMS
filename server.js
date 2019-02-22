const express = require('express');

const server = express();

const db = require('./data/dbConfig.js')

server.use(express.json());

server.get('/api/projects', async (req, res) => {
    try {
        const projects = await db('projects')
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json(error)
    }
});

server.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await db('projects').where({id: req.params.id}).first();
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json(error)
    }
})

server.post('/api/projects', async (req, res) => {
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

server.get('/api/actions', async (req, res) => {
    try {
        const actions = await db('actions')
        res.status(200).json(actions);
    } catch (error) {ß
        res.status(500).json(error)
    }
})

server.post('/api/actions', async (req, res) => {
    if (!req.body.description || !req.body.notes) {
        res.status(400).json({message:"Please provide description and notes"})
    } else {
        try {
            const id = await db('actions').insert(req.body);
            const newAction = await db('actions').where({id}).first()
            res.status(200).json({message:"success", newAction});
        } catch (error) {
            res.status(500).json({error})
        }   
    }
})

module.exports = server