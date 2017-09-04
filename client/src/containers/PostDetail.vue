<template>
    <mu-paper>
        <loadding-spinner v-if="postDetail.initial"/>
        <mu-card v-else>
            <mu-card-media>
                <div class="img-container" :style="{ backgroundImage: `url(${postDetail.data.cover})` }"/>
            </mu-card-media>
            <mu-card-title :title="postDetail.data.title" />
            <mu-card-actions>
                <mu-chip v-for="(tag, index) in postDetail.data.tags" :key="index">
                    {{ tag.name }}
                </mu-chip>
            </mu-card-actions>
            <mu-card-text>
                <vue-markdown class="markdown-text" slot="default">{{ postDetail.data.content }}</vue-markdown>
            </mu-card-text>
        </mu-card>
    </mu-paper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueMarkdown from 'vue-markdown'

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
  },
  components: {
      VueMarkdown
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
    .markdown-text {
        padding: 30px;
    }
</style>
