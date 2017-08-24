const Router = require('koa-router')

const user = require('./user')
const post = require('./post')
const tag = require('./tag')

const router = new Router({ prefix: '/api' })

router
.use(user.routes())
.use(post.routes())
.use(tag.routes())

module.exports = router
