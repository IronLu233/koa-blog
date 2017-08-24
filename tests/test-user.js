require('mocha')
const chai = require('chai')
const chaiHTTP = require('chai-http')
const APIClient = require('./client')

chai.use(chaiHTTP)

chai.should()

describe('test user', done => {
    const endpoint = '/api/user/'
    const client = APIClient()
    
    it('invalid request', done => {
        client
        .post(endpoint + 'login/')
        .send({ password: '2333' })
        .end((err, res) => {
            res.should.have.status(400)
            done()
        })
    })

    it('not exists', done => {
        client
        .post(endpoint + 'login/')
        .send({ username: 'Ir', password: '2333' })
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })

    it('wrong password', done => {
        client
        .post(endpoint + 'login/')
        .send({ username: 'Iron', password: '2333' })
        .end((err, res) => {
            res.should.have.status(401)
            done()
        })
    })

    it('user login', done => {
        client
        .post(endpoint + 'login/')
        .send({
            username: 'Iron',
            password: 'Iron'
        })
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
    it('change password bad request', (done) => {
        client
        .post(endpoint + 'change-password')
        .send({ password: '10000', confirmPassword: '10001' })
        .end((err, res) => {
            res.should.have.status(400)
            done()
        })
    })
})
