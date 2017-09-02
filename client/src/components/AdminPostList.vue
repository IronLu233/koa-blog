<template>
    <mu-table
    :enableSelectAll="true"
    :multiSelectable="true"
    @rowSelection="handleRowSelection"
    >
        <mu-thead>
            <mu-tr>
                <mu-th>id</mu-th>
                <mu-th>标题</mu-th>
                <mu-th>标签</mu-th>
                <mu-th>操作</mu-th>
            </mu-tr>
        </mu-thead>
        <mu-tbody>
            <mu-tr v-for="(p, index) in postList.data" :key="index">
                <mu-td>{{p.id}}</mu-td>
                <mu-td>{{p.title}}</mu-td>
                <mu-td></mu-td>
                <mu-td>
                    <mu-raised-button
                    @click="$router.push(`/admin/post/${p.id}/`)"
                    label="修改"/>
                    <mu-raised-button
                    label="删除"
                    @click="delPost(p.id)"
                    secondary/>
                </mu-td>
            </mu-tr> 
        </mu-tbody>
        <mu-tfoot>
            <mu-tr>
            <mu-td/>
            <mu-td/>
            <mu-td/>
            <mu-td>
                <mu-raised-button label="添加文章" @click="$router.push('/admin/post/add')"/>
                <mu-raised-button
                label="删除所选"
                secondary
                @click="handleDelSelections"/>
            </mu-td>
            </mu-tr>
        </mu-tfoot>
    </mu-table>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    methods: {
        handleRowSelection (selectedRowsIndex) {
            this.selectedPosts = selectedRowsIndex
        },
        handleDelSelections () {
            this.selectedPosts
            .map(p => this.postList.data[p].id)
            .map(p => this.delPost(p))
        },
        ...mapActions(['loadPosts', 'loadMorePosts', 'delPost'])
    },
    mounted: function () {
        this.loadPosts()
    },
  components: {
  },
  computed: {
      ...mapState(['postList'])
  },
  data() {
      return {
          selectedPosts: []
      }
  }
}
</script>
<style lang="scss" scoped>

</style>
