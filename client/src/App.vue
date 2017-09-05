<template>
    <div class="layout">
        <header>
            <mu-appbar>
                <mu-icon-button v-if="!isDrawerOpen || !inAdminPage" to="/post" slot="default" icon="home"/>
                <mu-icon-button
                v-if="inAdminPage"
                @click="toggleDrawer"
                slot="default"
                icon="menu"
                :style="{marginLeft: isDrawerOpen ? '256px': 'initial',  }"
                />
                <mu-icon-button @click="isBottomSheetOpen = true" icon="filter_list" slot="right"/>
                <mu-icon-button to="/admin/login" icon="build" slot="right"/>
            </mu-appbar>
            <mu-bottom-sheet :open="isBottomSheetOpen" @close="isBottomSheetOpen = false">
                <mu-sub-header>请选择一个标签</mu-sub-header>
                <mu-list @itemClick="isBottomSheetOpen = false">
                    <mu-list-item
                    v-for="tag in tags"
                    :key="tag.uniqueName"
                    :to="`/post/?tag=${tag.uniqueName}`"
                    :title="tag.name"/>
                </mu-list>
            </mu-bottom-sheet>
        </header>
        <main><router-view></router-view></main>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import _ from 'lodash'

export default {
    methods: {
        ...mapMutations(['toggleDrawer']),
        ...mapActions(['fetchTags'])
    },
    data () {
        return {
            isBottomSheetOpen: false
        }
    }
    ,
    computed: {
        inAdminPage () {
            const { path } = this.$route
            return path.indexOf('admin') !== -1 && path.indexOf('login') === -1
        },
        ...mapState({
            isDrawerOpen: state => state.shared.isDrawerOpen,
            tags: state => state.tag.data
        })
    },
    mounted () {
        this.fetchTags()
        window.addEventListener('resize', this.resizeListener = _.debounce(e => {
            const mediaQueryList = window.matchMedia('(min-width: 768px)')
            if (mediaQueryList.matches && !this.isDrawerOpen || !mediaQueryList.matches && this.isDrawerOpen) {
                this.toggleDrawer()
            }
        }, 200))

    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeListener)
    }
}
</script>
<style lang="scss">
    .mu-icon-button {
        transition: padding-left 1s
    }
    .mu-appbar {
        position: fixed;
        top: 0px;
    }
    main {
        margin-top: 80px;
    }
</style>
