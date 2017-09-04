<template>
  <mu-paper :style="{ marginLeft: isDrawerOpen ? '256px' : 'initial' }">
    <mu-table
    :enableSelectAll="true"
    :multiSelectable="true"
    @rowSelection="handleRowSelection">
        <mu-thead>
            <mu-tr>
                <mu-th>id</mu-th>
                <mu-th>标签名</mu-th>
                <mu-th>操作</mu-th>
            </mu-tr>
        </mu-thead>
        <mu-tbody>
            <mu-tr v-for="(tag, index) in tags" :key="index">
                <mu-td>{{ tag.id }}</mu-td>
                <mu-td>{{ tag.name }}</mu-td>
                <mu-td>
                    <mu-raised-button
                    label="更名"
                    @click="handleOpenTagNameDialog(tag)"
                    />
                    <mu-raised-button
                    label="删除"
                    @click="delTag(tag.id)"
                    secondary/>
                </mu-td>
            </mu-tr>
        </mu-tbody>
        <mu-tfoot>
            <mu-tr>
                <mu-td/>
                <mu-td/>
                <mu-td>
                    <mu-raised-button
                    @click="handleOpenTagNameDialog()"
                    label="添加新标签"/>
                    <mu-raised-button
                    label="删除所选"
                    labelFloat
                    secondary
                    @click="handleDelSelectedTags"
                    :disabled="selectedTags.length == 0"
                    />
                </mu-td>
            </mu-tr>
        </mu-tfoot>
    </mu-table>
    <mu-dialog :open="tagNameModifyDialogVisible" title="请输入标签名">
        <mu-text-field label="标签名称" v-model="newTagName" fullWidth/>
        <mu-flat-button
        label="取消"
        @click="tagNameModifyDialogVisible = false"
        slot="actions"/>
        <mu-flat-button label="确定" slot="actions" @click="handleSubmitTag"/>
    </mu-dialog>
  </mu-paper>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
        isDrawerOpen: state => state.shared.isDrawerOpen,
        tags: state => state.tag.data
    })
  },
  methods: {
      handleSubmitTag () {
          if(this.currentOperateTag) {
              this.updateTag({...this.currentOperateTag, name: this.newTagName })
          } else {
              this.addTag(this.newTagName)
          }
          this.tagNameModifyDialogVisible = false
      },
      handleDelTag (id) {
          this.delTag(id)
      },
      handleDelSelectedTags() {
          this.selectedTags
          .map(t => t.tags[t].id)
          .map(t => this.delTag(t))
      },

      handleOpenTagNameDialog (tag) {
          this.currentOperateTag = tag
          this.tagNameModifyDialogVisible = true
      },
      handleRowSelection (selectedRowsIndex) {
        this.selectedTags = selectedRowsIndex
    },
      ...mapActions(['delTag', 'updateTag', 'fetchTags', 'addTag'])
  },
  data () {
      return {
          selectedTags: [],
          tagNameModifyDialogVisible: false,
          currentOperateTag: undefined,
          newTagName: '',
      }
  },
  mounted () {
      this.fetchTags()
  }
}
</script>

<style lang="scss" scoped>
    .mu-table {
        margin-left: 256px;
    }
</style>
