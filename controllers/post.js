const Router = require('koa-router')

const { isAuthenticated } = require('../middlewares/permission')

const router = new Router({ prefix: '/post' })
router
.get('/', async ctx => {
    const { Post } = global
    const posts = await Post.collection().fetch({ withRelated: ['tags'] })
    ctx.body = posts.toJSON()
})
.get('/:id', async ctx => {
    const { Post } = global
    const post = await Post.where({ id: ctx.params.id }).fetch({ withRelated: ['tags']})
    if (post === null) {
        ctx.status = 404
        ctx.body = {
            detail: 'Can\'t find this article'
        }
        return
    }
    ctx.body = post.toJSON()
})
.post('/', isAuthenticated, async ctx => {
    const { Post, Tag } = global
    const { title, content, tags = [] } = ctx.request.body
    if (!title || !content) {
        ctx.body = {
            detail: 'Bad request',
        }
        ctx.status = 400
        return
    }
    
    let post = new Post({ title, content })
    for(let t in tags) {
        let tag = await Tag.where({ name: t }).fetch()
        if (!tag) {
            tag = new Tag({ name: t })
            await tag.save()
        }
        post.tags.attach(tag.id)
    }
    post = await post.save()
    ctx.body = post.toJSON()
})
.patch('/:id', isAuthenticated, async ctx => {
    const { Post, Tag } = global
    const { id } = ctx.params
    const post = await Post.where({ id }).fetch({ withRelated: ['tags']})
    if (!post) {
        ctx.body = {
            detail: 'Bad request',
        }
        ctx.status = 400
        return 
    }
    const { content, title, tags } = ctx.request.body
    if (content) {
        post.set('content', content)
    }
    if (title) {
        post.set('title', title)
    }
    if (tags !== undefined) {
        await post.tags().detach()
    }
    for(let t of tags) {
        let tag = await Tag.where({ name: t }).fetch()
        if (!tag) {
            tag = new Tag({ name: t })
            await tag.save()
        }
        await post.tags().attach(tag.id)
    }
    
    await post.save()
    ctx.status = 200
    ctx.body = post.toJSON()
})
.del('/:id', isAuthenticated, async ctx => {
    const { Post, Tag } = global
    const { id } = ctx.params
    const post = await Post.where({ id }).fetch()
    if (!post) {
        ctx.body = {
            detail: 'Bad request',
        }
        ctx.status = 400
        return 
    }
    await post.destroy()
    ctx.status = 204
})
module.exports = router
