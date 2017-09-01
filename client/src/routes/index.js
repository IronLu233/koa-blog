import App from '../App.vue'
import PostList from '../containers/PostList.vue'
import PostDetail from '../containers/PostDetail.vue'
import Admin from '../containers/Admin.vue'
import AdminLogin from '../containers/AdminLogin.vue'
import AdminPost from '../components/AdminPost.vue'
import AdminPostList from '../components/AdminPostList.vue'
import PostModify from '../components/PostModify.vue'

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: 'post/:id',
                component: PostDetail
            },
            {
                path: 'post',
                component: PostList,
            },
            {
                path: 'admin/login',
                component: AdminLogin
            },
            {
                path:'admin',
                component: Admin,
                children: [
                    {
                        path: '/',
                        component: AdminLogin,
                    },
                    {
                        path: 'post',
                        component: AdminPost,
                        children: [
                            {
                                path: '/',
                                component: AdminPostList,  
                            },
                            {
                                path: 'add',
                                component: PostModify,
                            }
                        ]
                    },
                    // {
                    //     path: 'tag',
                    //     // component:
                    // },
                ]
            }
        ]
    }
]
