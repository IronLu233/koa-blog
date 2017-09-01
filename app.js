const koa = require('koa')
const session = require('koa-session')
const views = require('koa-views')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const logger = require('koa-logger')
const body = require('koa-bodyparser')
const favicon = require('koa-favicon')

const router = require('./controllers')
const config = require('./config')
require('./models')

const viewRouter = new Router()
 
const app = new koa()
app.keys = config.keys
if ((process.env.NODE_ENV || 'development') !== 'testing') {
    app.use(logger()) // log
}

app
.use(session(config.session, app)) // session
.use(body()) // body parser
.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))) // favicon
.use(views(path.join(__dirname, 'views'))) // template path
.use(serve(path.join(__dirname, 'public'))) // static file
.use(router.routes()) // router

module.exports = app
