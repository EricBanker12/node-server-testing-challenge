const db = require('../data/db')

const usersDB = require('./usersModel')

beforeEach(() => db('users').truncate())

describe('usersModel', () => {

    describe('find', () => {

        // beforeEach(() => db('users').truncate())

        test('should resolve to an array', () => {
            return usersDB.find()
                .then(resp => {
                    expect(Array.isArray(resp)).toBe(true)
                })
        })

        test('array should include added users', async () => {
            await db('users').insert({username: 'testing'})
            await db('users').insert({username: 'testing 2'})

            await usersDB.find()
                .then(resp => {
                    expect(resp[0]).toBeDefined()
                    expect(resp[0].username).toBe('testing')
                    expect(resp[1]).toBeDefined()
                    expect(resp[1].username).toBe('testing 2')
                })
        })

        test('should resolve to an object, when given an id', async () => {
            const [id] = await db('users').insert({username: 'testing'}, 'id')

            await usersDB.find({id})
                .then(resp => {
                    expect(typeof resp).toBe('object')
                    expect(resp.username).toBe('testing')
                    expect(resp.id).toBeDefined()
                })
        })

    })

    describe('add', () => {

        // beforeEach(() => db('users').truncate())

        test('should resolve to the added user', () => {
            return usersDB.add({username: 'testing'})
                .then(resp => {
                    expect(resp.username).toBe('testing')
                })
        })

        test('should give an id', () => {
            return usersDB.add({username: 'testing'})
                .then(resp => {
                    expect(resp.id).toBeDefined()
                })
        })

    })

    describe('del', () => {

        // beforeEach(() => db('users').truncate())

        test('should delete a user', async () => {
            const [id] = await db('users').insert({username: 'testing'}, 'id')

            let users = await db('users')

            expect(users.length).toBe(1)

            usersDB.del(id)

            users = await db('users')

            expect(users.length).toBe(0)
        })

        test('should delete a user with given id', async () => {
            const [id] = await db('users').insert({username: 'testing'}, 'id')
            
            await db('users').insert({username: 'testing 2'})

            let users = await db('users')

            expect(users.length).toBe(2)

            usersDB.del(id)

            users = await db('users')

            expect(users.length).toBe(1)

            const deleted = await db('users').where({id}).first()

            expect(deleted).toBe(undefined)
        })

    })
})