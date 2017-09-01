import Vue from 'vue'
import Vuex from 'vuex';
import postDetail from './postDetail'
import postList from './postList'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        postDetail,
        postList,
        user,
        shared,
    }
})

export default store
