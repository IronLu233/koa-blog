<template>
    <mu-paper>
        <loadding-spinner v-if="postDetail.initial"/>
        <mu-card v-else>
            <mu-card-media>
                <div class="img-container" :style="{ backgroundImage: `url(${postDetail.data.cover})` }"/>
            </mu-card-media>
            <mu-card-title :title="postDetail.data.title" />
            <mu-card-actions>
                <div style="margin-left: 30px">
                <mu-chip v-for="tag in postDetail.data.tags" :key="tag.uniqueName">
                    <router-link :to="`/post/?tag=${tag.uniqueName}`">{{ tag.name }}</router-link>
                </mu-chip>
                </div>
            </mu-card-actions>
            <mu-card-text>
                <vue-markdown
                class="markdown-text"
                :postrender="highlight"
                slot="default">{{ postDetail.data.content }}</vue-markdown>
            </mu-card-text>
        </mu-card>
    </mu-paper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  methods: {
      highlight (text) {
        Prism.highlightAll()
        return text
      },
      ...mapActions([ 'loadPostDetail' ])
  },
  computed: {
      ...mapState([ 'postDetail' ])
  },
  beforeRouteUpdate() {
      this.loadPostDetail(this.$route.params.id)
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
    .mu-chip {
        margin-right: 20px;
    }
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
