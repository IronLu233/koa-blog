import axios from 'axios'

const provider = axios.create({
    withCredentials: true
})

export default {
    fetchPostList: (params) => {
        return provider.get('/api/post')
    },
    fetchPostDetail: (id) => {
        return provider.get(`/api/post/${id}`)
    },
    login: (data) => {
        return provider.post('/api/user/login', data)
    },
    delPost: (id) => {
        return provider.delete(`/api/post/${id}`)
    },
    uploadCover: file => {
        const data = new FormData()
        data.append('image', file)
        return provider.post('/api/post/upload', data)
    },
    publishPost: post => {
        return provider.post('/api/post/', post)
    },
    getUserInfo: () => {
        return provider.get('/api/user/')
    },
    updatePost: post => {
        return provider.patch(`/api/post/${post.id}/`, post)
    },
    fetchTags: () => {
        return provider.get('/api/tag/')
    }

}

