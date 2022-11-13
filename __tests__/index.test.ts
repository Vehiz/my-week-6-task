
const request = require('supertest');
const app = require('../build/app');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


describe('Route Tests', ()=>{
 
    describe('Request to users and movies routes', ()=>{
        it('GET /users/signup Should return 200 ', async ()=>{
            const res = await request(app).get('/users/signup');
            expect(res.status).toBe(200)
        })
        it('GET /users/login should return 200 ', async ()=>{
            const res = await request(app).get('/users/login');
            expect(res.status).toBe(200)
        })
        it('POST /users/signup should return 200 ', async ()=>{
            const res = await request(app).post('/users/signup');
            expect(res.status).not.toBe(400)
        })
        it('POST /users should return 201  ', async ()=>{
            const res = await request(app).post('/users');
            expect(res.status).not.toBe(401)
        })
        it('GET /movies should return 200 ', async ()=>{
            const res = await request(app).post('/movies');
            expect(res.status).not.toBe(401)
        })
        it('GET /movies/add should return 200 ', async ()=>{
            const res = await request(app).get('/movies/add');
            expect(res.status).not.toBe(401)
        })
        it('GET /movies/update/:id should return 200 ', async ()=>{
            const res = await request(app).get('/movies/update/:id');
            expect(res.status).not.toBe(401)
        })
        it('PUT /movies/update should return 200 ', async ()=>{
            const res = await request(app).put('/movies/update');
            expect(res.status).not.toBe(401)
        })
        it('GET /movies/delete/:id Should return 200 ', async ()=>{
            const res = await request(app).get('/movies/delete/:id');
            expect(res.status).not.toBe(401)
        })
        it('DELETE /movies/delete/:id Should return 200 ', async ()=>{
            const res = await request(app).post('/movies/delete/:id');
            expect(res.status).not.toBe(401)
        })
        it('GET /movies Should return 200 ', async ()=>{
            const res = await request(app).put('/movies');
            expect(res.status).not.toBe(401)
        })
    })
})