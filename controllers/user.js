const Router = require('koa-router')

const { isAuthenticated } = require('../middlewares/permission')

const router = new Router({ prefix: '/user' })

router
.post('/login', async ctx => {
    const { User } = global
    const { uid } = ctx.session
    if (uid && await User.where({ id: uid }).count() !== 0) {
        ctx.status = 200
        ctx.body = {
            detail: 'Already login'
        }
    }
    const { username, password } = ctx.request.body
    if (!username || !password) {
        ctx.status = 400
        ctx.body = {
            detail: 'Bad request.'
        }
        return
    }
    const user = await User.where({ username}).fetch()
    if (user === null) {
        ctx.status = 404
        ctx.body = {
            detail: 'invalid username'
        }
        return
    }
    if (!await user.checkPassword(password)) {
        ctx.status = 401
        ctx.body = {
            detail: 'wrong password'
        }
        return
    }
    ctx.session.uid = user.id 
    ctx.status = 200
    ctx.body = {
        detail: 'success'
    }

})
.post('/logout', async ctx => {
    ctx.session.uid = undefined
    ctx.body = {
        detail: 'logout success'
    }
})
.post('/change-password', isAuthenticated, async ctx => {
    const { User } = global
    const { uid } = ctx.session
    const { password, confirmPassword } = ctx.request.body
    if (!password || !confirmPassword || password !== confirmPassword) {
        ctx.status = 400
        ctx.body = {
            detail: 'bad request',
        }
        return
    }
    const user = await User.where({ id: uid }).fetch()
    user.password = password
    await user.save()
    ctx.status = 204
    ctx.body = {}
})
module.exports = router
