const Router = require('koa-router')

const user = require('./user')
const post = require('./post')
const tag = require('./tag')

const viewRouter = new Router()
const APIRouter = new Router({ prefix: '/api' })

viewRouter.get(/^(?!\/api\/).*/, async ctx => await ctx.render('index.html'))

APIRouter
.use(user.routes())
.use(post.routes())
.use(tag.routes())

viewRouter.use(APIRouter.routes())
module.exports = viewRouter
