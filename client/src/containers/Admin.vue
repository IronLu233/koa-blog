<template>
  <div>
    <mu-drawer :open="isDrawerOpen" docked="docked" :zDepth="1">
      <mu-appbar>
        <mu-icon-button to="/post" slot="default" icon="home"/>
      </mu-appbar>
      <mu-list>
        <mu-list-item to="/admin/post" title="文章管理"><mu-icon slot="left" value="mode_edit"/></mu-list-item>
        <mu-list-item to="/admin/tag" title="标签管理"><mu-icon slot="left" value="label"/></mu-list-item>
      </mu-list>
    </mu-drawer>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
        isDrawerOpen: state => state.shared.isDrawerOpen,
        isLogin: state => state.user.isLogin
    })
  },
  methods: {
    ...mapMutations(['toggleDrawer']),
    ...mapActions(['getUserInfo'])
  },
  mounted() {
    this.getUserInfo()
    .then(res => {
      if (!res.data.isLogin) {
      this.$router.replace('/admin/login/')
    }
    })
  }

}
</script>
<style lang="scss">
</style>
