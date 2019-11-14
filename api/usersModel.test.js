const db = require('../data/db')

const usersDB = require('./usersModel')



describe('usersModel', () => {
    beforeEach(() => db('users').truncate())

    describe('find', () => {

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
})