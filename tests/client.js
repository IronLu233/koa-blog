const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = require('./server')
chai.use(chaiHTTP)

module.exports = () => chai.request.agent(server)
