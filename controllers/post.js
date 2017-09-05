const Router = require('koa-router')
const path = require('path')

const { isAuthenticated } = require('../middlewares/permission')
const uploadKit = require('../middlewares/upload')

const router = new Router({ prefix: '/post' })
router
.get('/', async ctx => {
    const { Post, Tag } = global
    const posts = await Post.collection().fetch({ withRelated: ['tags'] })
    const data = posts.toJSON()
    if (ctx.query.tag) {
        ctx.body = data.filter(p => p.tags.map(t => t.uniqueName).indexOf(ctx.query.tag) !== -1)
    } else {
        ctx.body = data
    }

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
.post('/upload', isAuthenticated, uploadKit.single('image'), async ctx => {
    const { file } = ctx.req;
    if (!file) {
        ctx.body = { detail: 'Bad request' }
        ctx.status = 400
        return
    }

    ctx.body = { url: path.join('/uploads', file.filename) }
    ctx.status = 201
})
.post('/', isAuthenticated, async ctx => {
    const { Post, Tag } = global
    const { title = '', content = '', tags = [], abstract = '', cover = ''} = ctx.request.body
    if (!title || !content) {
        ctx.body = {
            detail: 'Bad request',
        }
        ctx.status = 400
        return
    }
    
    let post = new Post({ title, content, abstract, cover })
    await post.save()
    for(let t of tags) {
        let tag = await Tag.where({ name: t }).fetch()
        if (!tag) {
            tag = new Tag({ name: t })
            await tag.save()
            console.log(tag)
        }
        await post.tags().attach(tag.id)
    }
    ctx.body = post.toJSON()
})
.patch('/:id', isAuthenticated, uploadKit.single(), async ctx => {
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
    const { content, title, abstract, cover, tags } = ctx.request.body
    if (content) {
        post.set('content', content)
    }
    
    if (title) {
        post.set('title', title)
    }

    if (abstract) {
        post.set('abstract', abstract)
    }

    if (cover) {
        post.set('cover', cover)
    }

    if (tags !== undefined) {
        await post.tags().detach()
        for(let t of tags) {
            let tag = await Tag.where({ name: t }).fetch()
            if (!tag) {
                tag = new Tag({ name: t })
                await tag.save()
            }
            await post.tags().attach(tag.id)
        }
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
