const db = require('../data/db')

module.exports = {
    find,
}

function find(filter) {
    if (filter) return db('users').where(filter).first()
    else return db('users')
}