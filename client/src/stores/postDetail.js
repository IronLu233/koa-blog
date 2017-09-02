import fetchAPI from '../APIs'

export default {
    state: {
        isLoading: false,
        data: null,
        currentPage: 1,
        initial: true,
    },
    mutations: {
        updatePostDetail: (state, post) => {
            state.data = post
            state.initial = false
        },
        startLoading: state => state.isLoading = true,
        endLoading: state => state.isLoading = false,
    },
    actions: {
        loadPostDetail: ({ state, commit }, postId) => {
            commit('startLoading')
            fetchAPI.fetchPostDetail(postId)
            .then(res => {
                commit('endLoading')
                commit('updatePostDetail', res.data)
                return res
            })
        },
        delPost: ({ state, commit, dispatch }, postId) => {
            return fetchAPI.delPost(postId)
            .then(res => {
                dispatch('loadPosts')
            })
        },
        updatePost: (context, post) => {
            console.log(post)
            return fetchAPI.updatePost(post)
        }

    }
}
