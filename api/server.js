const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const usersDB = require('./usersModel')

const server = express()

// middleware
server.use(helmet())
server.use(cors())
server.use(express.json())

// routes/routers
server.get('/api/users', (req, res) => {
    usersDB.find()
        .then(resp => {
            res.json(resp)
        })
        .catch(err => {
            console.error(err)
            res.sendStatus(500)
        })
})

server.post('/api/users', (req, res) => {
    usersDB.add(req.body)
        .then(resp => {
            res.status(201).json(resp)
        })
        .catch(err => {
            console.error(err)
            res.sendStatus(500)
        })
})

server.delete('/api/users/:id', (req, res) => {
    usersDB.del(req.params.id)
        .then(resp => {
            if (resp) res.sendStatus(204)
            else res.sendStatus(400)
        })
        .catch(err => {
            console.error(err)
            res.sendStatus(500)
        })
})

module.exports = server