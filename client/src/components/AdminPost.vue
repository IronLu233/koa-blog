<template>
  <mu-paper :style="{ marginLeft: isDrawerOpen ? '256px' : 'initial' }">
    <router-view></router-view>
  </mu-paper>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import AdminPostList from './AdminPostList.vue'

export default {
  computed: {
    ...mapState({
        isDrawerOpen: state => state.shared.isDrawerOpen
    })
  },
}
</script>
<style lang="scss" scoped>
</style>
