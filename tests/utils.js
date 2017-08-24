const APIClient = require('./client')

exports.createPost = async (title, content, tags = []) => {
    const { Post } = global
    const post = new Post({ title, content })
    await post.save()
    await post.tags().attach(tags.map(t => t.id))
    return post
}

exports.createTag = async(name) => {
    const { Tag } = global
    const tag = new Tag({ name })
    await tag.save()
    return tag
}

exports.getAuthenticatedClient = async () => {
    const client = APIClient()
    await client.post('/api/user/login')
    .send({ username: 'Iron', password: 'Iron' })
    return client
}
