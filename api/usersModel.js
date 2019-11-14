const db = require('../data/db')

module.exports = {
    find,
    add,
    del,
}

function find(filter) {
    if (filter) return db('users').where(filter).first()
    else return db('users')
}

function add(user) {
    return db('users').insert(user, '*')
        .then(([id]) => find({id}))
}

function del(id) {
    return db('users').where({id}).del()
}