import fetchAPI from '../APIs';
export default {
    state: {
        data: []
    },
    mutations: {
        updateTags: (state, tags) => {
            state.data = tags
        },

    },
    actions: {
        fetchTags: ({ commit }) => {
            return fetchAPI.fetchTags()
            .then(res => {
                commit('updateTags', res.data)
                return res
            })
        },
        delTag: ({ commit, dispatch }, postId) => {
            fetchAPI.delTag(postId)
            .then(res => {
                return dispatch('fetchTags')
            })
        },
        updateTag: ({ dispatch }, tag) => {
            fetchAPI.updateTag(tag)
            .then(() => {
                return dispatch('fetchTags')
            })
        },
        addTag: ({ dispatch }, tagName) => {
            return fetchAPI.addTag(tagName)
            .then(() => {
                return dispatch('fetchTags')
            })
        }
    }
}