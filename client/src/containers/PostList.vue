<template>
        <LoadingSpinner v-if="this.postList.initial"/>
        <div v-else class="post-content">
            <mu-breadcrumb class="mu-breadcrumb">
                <template v-if="$route.query.tag">
                    <mu-breadcrumb-item href="/post"><mu-icon value="home" :size="14"/><router-link to="/post">首页</router-link></mu-breadcrumb-item>
                    <mu-breadcrumb-item><mu-icon value="filter_list" :size="14"/>筛选结果</mu-breadcrumb-item>
                </template>
                <template v-else>
                   <mu-breadcrumb-item><mu-icon value="home" :size="14"/>首页</mu-breadcrumb-item> 
                </template>
            </mu-breadcrumb>
            <PostContent
            v-for="(post, index) in this.postList.data"
            :key="index"
            :post="post"/>
        </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PostContent from '../components/PostContent.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
export default {
    methods: {
        ...mapActions(['loadPosts', 'loadMorePosts'])
    },
    mounted () {
        this.loadPosts(this.$route.query)
    },
    
    beforeRouteUpdate (to, from, next) {
        this.loadPosts(to.query)
        next()
    },
    components: {
        LoadingSpinner
    },
    components: {
        PostContent
    },
  computed: {
      ...mapState(['postList'])
  }
}
</script>

<style lang="scss">
    .postlist-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 150px);
        width: 100%;
    }
    .post-content:first-child {
        // margin-top: 60px;
    }

</style>


<style lang="scss" scoped>
    .mu-breadcrumb {
        margin-left: 40px;
    }
</style>
