const db = require('../data/db')

module.exports = {
    find,
    add,
}

function find(filter) {
    if (filter) return db('users').where(filter).first()
    else return db('users')
}

function add(user) {
    return db('users').insert(user, '*')
        .then(([id]) => find({id}))
}