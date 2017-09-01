import Vue from 'vue'
import VueRouter from 'vue-router'
import Muse from 'muse-ui'
import VueMarkdown from 'vue-markdown'

import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

Vue.use(VueRouter)
Vue.use(Muse)
Vue.use(VueMarkdown)

import App from './App.vue'
import routes from './routes'
import store from './stores'


const router = new VueRouter({
    routes,
    mode: 'history'
})
new Vue({
    router,
    store,
    components: {
        'vue-markdown': VueMarkdown
    }
}).$mount('#vue-root')
