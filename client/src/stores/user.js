import fetchAPI from '../APIs'

export default {
    state: {
        isLoading: false,
        isLogin: false,
    },
    mutations: {
        toggleLoadingState: state => state.isLoading = !state.isLoading,
        setLoginSuccess: state => state.isLogin = true,
        setLoginFailed: state => state.isLogin = false
    },
    actions: {
        login: ({ commit, state }, data) => {
            commit('toggleLoadingState')
            return fetchAPI.login(data)
            .then(res => {
                commit('setLoginSuccess')
                return res
            })
            .catch(reason => {
                commit('setLoginFailed')
                throw reason
            })
            .finally(() => {
                commit('toggleLoadingState')
            })
        },
        getUserInfo: ({ commit }) => {
            return fetchAPI.getUserInfo()
            .then(res => {
                if (res.data.isLogin) {
                    commit('setLoginSuccess')
                } else {
                    commit('setLoginFailed')
                }
                return res
            })
        }
    }
}
