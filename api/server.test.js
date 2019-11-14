const request = require('supertest')

const server = require('./server')

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
                    expect(Array.isArray(resp.data)).toBe(true)
                })
        })
    })
})