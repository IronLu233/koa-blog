import fetchAPI from '../APIs'

export default {
    state: {
        isLoading: false,
        initial: true,
        data: [],
        currentPage: 1,
    },
    mutations: {
        addPosts: (state, morePosts) => {
            state.data = [...state.data, ...morePosts]
        },
        updatePost: (state, posts) => state.data = posts,
        startLoading: state => {
            state.isLoading = true
            state.initial = false
        },
        endLoading: state => state.isLoading = false,
        turnNextPage: state => ++state.currentPage
    },
    actions: {
        loadPosts: ({ commit, state }) => {
            commit('startLoading')
            return fetchAPI.fetchPostList()
            .then(res => {
                commit('endLoading')
                commit('updatePost', res.data)
                return res
            })
        },
        loadMorePosts: ({ commit, state }) => {
            commit('startLoading')
            commit('turnNextPage')
            return fetchAPI.fetchPostList({ page: state.currentPage })
            .then(res => {
                commit('endLoading')
                commit('addPosts', res.data)
                return res
            })
        },
        uploadCover: ({ state, commit }, image) => {
            return fetchAPI.uploadCover(image)
        }
    },
    
}