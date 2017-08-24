const koa = require('koa')
const session = require('koa-session')

const logger = require('koa-logger')
const body = require('koa-bodyparser')
const router = require('./controllers')
const config = require('./config')
require('./models')

const app = new koa()
app.keys = config.keys
if ((process.env.NODE_ENV || 'development') !== 'testing') {
    app.use(logger())
}
app
.use(session(config.session, app))
.use(body())
.use(router.routes())


module.exports = app
