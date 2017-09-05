<template>

<mu-paper>
    <mu-card>
        <router-link :to="`/post/${post.id}/`">
            <mu-card-media :title="post.title" :subTitle="post.abstract">
                <div class="img-container" :style="{ backgroundImage: `url(${post.cover})` }"/>
            </mu-card-media>
        </router-link>
    </mu-card>
</mu-paper>

</template>
<script>
export default {
  props: {
      post: Object,
  }
}
</script>
<style lang="scss" scoped>
    .mu-paper {
        margin: 30px 140px;
        
    }
    .mu-card-media {
        .img-container {
            height: 80vh;
            background-repeat: repeat-x;
            background-size: 100%;
        }
    }
</style>
