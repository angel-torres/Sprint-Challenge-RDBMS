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

route.get('/:id/actions', async (req, res) => {
    try {
        const project = await db('projects').where({id:req.params.id}).first()
        const projectActions = await db('actions').where({project_id:req.params.id})
        res.status(200).json({...project, actions:projectActions})
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

route.put('/:id', async (req, res) => {
    if (!req.body.name || !req.body.notes) {
        res.status(400).json({message:"Please provide project name and description."})
    } else {
        try {
            const newProject = await db('projects').where({id:req.params.id}).update(req.body)
            res.status(200).json({message:"success", updated:newProject});
        } catch (error) {
            res.status(500).json({error})
        }   
    }
})

route.delete('/:id', (req, res) => {
    db('projects').where({id:req.params.id}).del()
    .then(response => res.status(204).end())
    .catch(err => res.status(500).json(err))
})

module.exports = route;