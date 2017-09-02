import Vue from 'vue'
import Vuex from 'vuex';
import postDetail from './postDetail'
import postList from './postList'
import user from './user'
import shared from './shared'
import tag from './tag'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        postDetail,
        postList,
        user,
        shared,
        tag,
    }
})

export default store
