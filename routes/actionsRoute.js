const express = require('express');
const route = express.Router();

const db = require('../data/dbConfig.js')

route.get('/', async (req, res) => {
    try {
        const actions = await db('actions')
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json(error)
    }
})

route.get('/:id', (req, res) => {
    db('actions').where({id:req.params.id}).first()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({message: error}))
})

route.post('/', async (req, res) => {
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

route.put('/:id', async (req, res) => {
    if (!req.body.description || !req.body.notes) {
        res.status(400).json({message:"Please provide description and notes"})
    } else {
        try {
            const newAction = await db('actions').where({id:req.params.id}).update(req.body)
            res.status(200).json({message:"success", updated:newAction});
        } catch (error) {
            res.status(500).json({error})
        }   
    }
})

route.delete('/:id', (req, res) => {
    db('actions').where({id:req.params.id}).del()
    .then(response => res.status(204).end())
    .catch(err => res.status(500).json(err))
})

module.exports = route;