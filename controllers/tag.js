const Router = require('koa-router')

const { isAuthenticated } = require('../middlewares/permission')

const router = new Router({ prefix: '/tag' })

router
.get('/', async ctx => {
    const { Tag } = global
    const tags = await Tag.collection().fetch()
    ctx.body = tags.map(t => ({ name: t.get('name'), uniqueName: t.get('uniqueName'), id: t.get('id') }))
})
.get('/:id', async ctx => {
    const { Tag } = global
    const tag = await Tag.where({ id: ctx.params.id }).fetch()
    if (tag === null) {
        ctx.status = 404
        ctx.body = {
            detail: 'Can\'t find this article'
        }
        return
    }
    ctx.body = tag.toJSON()
})
.post('/', isAuthenticated, async ctx => {
    const { Tag } = global
    const { name } = ctx.request.body
    if (!name) {
        ctx.body = {
            detail: 'Bad request',
        }
        ctx.status = 400
        return
    }
    
    let tag = new Tag ({ name })
    await tag.save()
    ctx.body = tag.toJSON()
})
.patch('/:id', isAuthenticated, async ctx => {
    const { Tag } = global
    const { id } = ctx.params
    const tag = await Tag.where({ id }).fetch()
    if (!tag) {
        ctx.body = {
            detail: 'not found',
        }
        ctx.status = 404
        return 
    }
    const { name } = ctx.request.body
    tag.set('name', name)
    await tag.save()
    ctx.status = 200
    ctx.body = tag.toJSON()
})
.del('/:id', isAuthenticated,async ctx => {
    const { Tag } = global
    const { id } = ctx.params
    const tags = await Tag.where({ id }).fetch()
    if (!tags) {
        ctx.body = {
            detail: 'Bad request',
        }
        ctx.status = 400
        return 
    }
    await tags.destroy()
    ctx.status = 204
})

module.exports = router
