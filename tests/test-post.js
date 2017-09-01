require('mocha')
const chai = require('chai')
const chaiHTTP = require('chai-http')
const path = require('path')
const utils = require('./utils')
const APIClient = require('./client')

chai.use(chaiHTTP)

const should = chai.should()

describe('test post', done => {
    let client = APIClient()
    const endpoint = '/api/post/'
    let tags = [], posts = []
    beforeEach('create posts for test', async () => {
        client = APIClient()
        posts = await global.Post.fetchAll()
        await Promise.all(posts.map(p => p.destroy()))
        tags = await global.Tag.fetchAll()
        await Promise.all(tags.map(t => t.destroy()))

        tags = [await utils.createTag('tag1'), await utils.createTag('tag2')]
        posts = [await utils.createPost('title1', 'content1', tags), await utils.createPost('title2', 'content2', [])]
    })

    it('get all posts', async () => {
        const res = await client.get(endpoint)
        const data = Array.from(res.body)
        data.length.should.eq(2)
    })

    it('get individual post', async () => {
        let res = await client.get(endpoint + posts[0].id)
        res.body.should.have.property('title')
        res.body.should.have.property('content')
        res.body.tags.should.to.be.an('array')

        try {
            res = await client.get(endpoint + '999')
            res.status.should.not.eq(200)
        } catch (e) {
            e.should.have.property('response')
            e.response.status.should.eq(404)
        }
    })

    it('post a post', async () => {
        try {
            let res = await client
            .post(endpoint)
        } catch (e) {
            e.should.have.a.property('response')
            e.response.status.should.eq(401)
        }

        await client.post('/api/user/login')
        .send({ username: 'Iron', password: 'Iron' })

        let res = await client.post(endpoint)
        .send({ title: 'post1', content: 'content1' })
        let posts = await global.Post.fetchAll()
        let postCount = await posts.count()
        postCount.should.be.equal(3)
    })

    it('test upload a image', async () => {
        try {
            let res = await client
            .post(endpoint + 'upload')
            .attach('image', path.resolve(__dirname, 'test-upload.jpg'))
            res.response.status.should.not.equal(201)
        } catch (e) {
            e.should.have.a.property('response')
            e.response.status.should.eq(401)
        }
        client = await utils.getAuthenticatedClient()
        res = await client
        .post(endpoint + 'upload')
        .attach('image', path.resolve(__dirname, 'test-upload.jpg'))
        console.log(res.body);
        
    })

    it('delete a post', async () => {
        try {
            let res = await client.del(endpoint + posts[0].id)
            res.status.should.not.equal(204)
        } catch(e) {
            e.should.have.a.property('response')
            e.response.status.should.eq(401)
        }
        await client.post('/api/user/login')
        .send({ username: 'Iron', password: 'Iron' })

        let res = await client.del(endpoint + posts[0].id)
        res.status.should.equal(204)
        posts = await global.Post.fetchAll()
        postCount = await posts.count()
        postCount.should.be.equal(1)
    })

    it('patch a post' , async () => {
        try {
            let res = await client.patch(endpoint + posts[0].id)
            res.status.should.not.equal(200)
        } catch (e) {
            e.should.have.a.property('response')
            e.response.status.should.equal(401)
        }

        client = await utils.getAuthenticatedClient()
        let res = await client
        .patch(endpoint + posts[0].id)
        .send({
            title: 'changed',
            content: 'changed',
            tags: []
        })
        res.status.should.equal(200)
        let post = await posts[0].refresh({ withRelated: ['tags'] })
        let data = post.toJSON()
        data.content.should.equal('changed')
        data.title.should.equal('changed')
        data.tags.should.be.an('array')
        data.tags.length.should.equal(0)
        
        res = await client
        .patch(endpoint + posts[0].id)
        .send({
            title: 'changed',
            content: 'changed',
            tags: ['tag1', 'tag2', 'tag3']
        })
        post = await posts[0].refresh({ withRelated: ['tags'] })
        data = post.toJSON()
        data.tags.length.should.equal(3)
    })
})
