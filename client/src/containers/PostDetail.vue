<template>
    <mu-paper>
        <loadding-spinner v-if="postDetail.initial"/>
        <mu-card v-else>
            <mu-card-media>
                <div class="img-container" :style="{ backgroundImage: `url(${postDetail.data.cover})` }"/>
            </mu-card-media>
            <mu-card-title :title="postDetail.data.title" />
            <mu-card-text>
                {{ postDetail.data.content }}
            </mu-card-text>
        </mu-card>
    </mu-paper>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  methods: {
      ...mapActions([ 'loadPostDetail' ])
  },
  computed: {
      ...mapState([ 'postDetail' ])
  },
  mounted: function () {
      this.loadPostDetail(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>

    .mu-card {
        padding-top: -20px;
    }
    .mu-card-media {
        .img-container {
            height: 66vh;
            background-size: 100%;
        }
    }
</style>
