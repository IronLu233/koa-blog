<template>
        <loadding-spinner v-if="this.postList.initial"/>
        <div v-else>
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
    mounted: function () {
        this.loadPosts()
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
</style>

