require('mocha')
const chai = require('chai')
const chaiHTTP = require('chai-http')
const utils = require('./utils')
const APIClient = require('./client')

chai.use(chaiHTTP)

const should = chai.should()

describe('test tag', done => {
    let client = APIClient()
    const endpoint = '/api/tag/'
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

    it('get all tags', async () => {
        const res = await client.get(endpoint)
        const data = Array.from(res.body)
        data.length.should.eq(2)
    })

    it('get individual tag', async () => {
        let res = await client.get(endpoint + tags[0].id)
        res.body.should.have.property('uniqueName')
        res.body.should.have.property('name')

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

        client = await utils.getAuthenticatedClient()

        let res = await client.post(endpoint)
        .send({ name: 'tag3' })
        let tagCount = await global.Tag.count()
        tagCount.should.be.equal(3)
    })

    it('delete a tag', async () => {
        try {
            let res = await client.del(endpoint + tags[0].id)
            res.status.should.not.equal(204)
        } catch(e) {
            e.should.have.a.property('response')
            e.response.status.should.eq(401)
        }
        
        client = await utils.getAuthenticatedClient()

        let res = await client.del(endpoint + tags[0].id)
        res.status.should.equal(204)
        tagCount = await global.Tag.count()
        tagCount.should.be.equal(1)
    })

    it('patch a post' , async () => {
        try {
            let res = await client.patch(endpoint + tags[0].id)
            res.status.should.not.equal(200)
        } catch (e) {
            e.should.have.a.property('response')
            e.response.status.should.equal(401)
        }

        client = await utils.getAuthenticatedClient()
        let res = await client
        .patch(endpoint + tags[0].id)
        .send({
            name: 'tag3'
        })
        res.status.should.equal(200)
        let tag = await tags[0].refresh()
        let data = tag.toJSON()
        data.name.should.equal('tag3')
    })
})
