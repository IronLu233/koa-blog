export default {
    state: {
        isDrawerOpen: true,
    },
    mutations: {
        toggleDrawer: state => state.isDrawerOpen = !state.isDrawerOpen
    }
}