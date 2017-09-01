import axios from 'axios'

const provider = axios.create()
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
    }
}
