const request = require('supertest')

const server = require('./server')
const db = require('../data/db')

describe('/API', () => {

    describe('GET /users', () => {
        
        test('should receive status 200 OK', () => {
            return request(server).get('/api/users').expect(200)
        })

        test('should receive content type json', () => {
            return request(server).get('/api/users')
                .then(resp => {
                    expect(resp.type).toMatch(/json/i)
                })
        })

        test('should receive an array', () => {
            return request(server).get('/api/users')
                .then(resp => {
                    expect(Array.isArray(resp.body)).toBe(true)
                })
        })
    })

    describe('POST /users', () => {

        beforeEach(() => db('users').truncate())
        
        test('should receive status 201 Created', () => {
            return request(server).post('/api/users').send({username: 'testing'}).expect(201)
        })

        test('should receive content type json', () => {
            return request(server).post('/api/users').send({username: 'testing'})
                .then(resp => {
                    expect(resp.type).toMatch(/json/i)
                })
        })

        test('should receive added user with an id', () => {
            return request(server).post('/api/users').send({username: 'testing'})
                .then(resp => {
                    expect(resp.body).toBeDefined()
                    expect(resp.body.username).toBe('testing')
                    expect(resp.body.id).toBeDefined()
                })
        })
    })

    describe('DELETE /users/:id', () => {

        beforeEach(() => db('users').truncate())
        
        test('should receive status 204 No Content', async () => {
            const [id] = await db('users').insert({username: 'testing'})

            return request(server).delete('/api/users/'+id).expect(204)
        })

        test('should remove the user', async () => {
            const [id] = await db('users').insert({username: 'testing'})

            await request(server).delete('/api/users/'+id).expect(204)

            const user = await db('users').where({id}).first()

            expect(user).toBe(undefined)
        })
        
    })
})