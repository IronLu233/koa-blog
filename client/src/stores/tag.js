import fetchAPI from '../APIs';
export default {
    state: {
        tags: []
    },
    mutations: {
        updateTags: (state, tags) => {
            state.tags = tags
        },

    },
    actions: {
        fetchTags: ({ commit }) => {
            return fetchAPI.fetchTags()
            .then(res => {
                commit('updateTags', res.data)
                return res
            })
        }
    }
}