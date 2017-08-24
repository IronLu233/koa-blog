process.env.NODE_ENV='testing'
require('mocha')
const fs = require('fs')
require('../models/index')
const bookshelf = require('../helpers/bookshelf')
const knexConfig = require('../knexfile')

before('create and migrate database',done => {
    bookshelf.knex.migrate.latest().asCallback(done)
})
beforeEach('start server', done => {
    require('./server')
    done()
})

beforeEach('create user', done => {
    const { User } = global
    const user = new User({ username: 'Iron', password: 'Iron' })
    user.save().asCallback(done)
})

after('remove database for test', done => {
    fs.unlink(knexConfig.testing.connection.filename, done)
})
