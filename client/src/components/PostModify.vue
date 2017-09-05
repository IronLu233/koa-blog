<template>
    <mu-content-block>
        <mu-text-field v-model="title" label="标题" labelFloat fullWidth/>
        <mu-text-field v-model="abstract" label="简介" labelFloat fullWidth/>
        <mu-chip
        v-for="(tag, index) in selectedTags"
        :key="index"
        backgroundColor="pink300"
        color="pink50"
        @delete="handleRemoveTags(index)"
        showDelete>
            {{ tag }}
        </mu-chip><br/>
        <mu-auto-complete
        labelFloat
        v-model="tagSelectorText"
        :dataSource="tagSuggestions"
        label="搜索/新建标签"
        @change="handleTagSelectorChange"
        @select="handleSelectSuggestions"
        filter="caseInsensitiveFilter"/>
        <mu-raised-button
        label="添加标签"
        icon="label"
        backgroundColor="pink300"
        :disabled="tagSelectorText.length === 0"
        @click="handleCreateNewTag"
        />
        <br/>
        <mu-raised-button
        @click="handleOpenUploadDialog"
        :icon="cover.length === 0 ? 'file_upload' : 'refresh'"
        backgroundColor="pink300"
        :label="cover.length === 0 ? '上传封面' : '更换封面'">
            <input
            id="fileUpload"
            @change="handleUploadCover"
            type="file"
            accept="image/*"
            ref="fileInputField"/>
        </mu-raised-button>
        <mu-raised-button
        :icon=" inPreview ? 'mode_edit' : 'visibility'"
        backgroundColor="pink300"
        :label="inPreview ? '编辑' : '预览'"
        @click="inPreview = !inPreview" />
        <mu-raised-button
        icon="image"
        label="查看封面"
        v-show="cover.length > 0"
        @click="coverVisible = true"
        backgroundColor="pink300"
        />
        <mu-paper v-show="inPreview">
            <vue-markdown
            :show="inPreview"
            :watches="['show']"
            :class="{'markdown-preview': inPreview}"
            >
            {{ content }}
            </vue-markdown>
        </mu-paper>
        <mu-text-field
        v-show="!inPreview"
        v-model="content"
        ref="content"
        label="正文"
        :rows="12"
        multiLine
        labelFloat
        fullWidth/>
        <mu-raised-button
        icon="done"
        :label=" mode == MODE.ADD  ? '发布' : '保存'" 
        backgroundColor="cyan500"
        @click="handlepublishPost"
        :disabled="!cover || !title || !content || !abstract"
        primary
        fullWidth/>
        <mu-popup
        :open="coverVisible"
        @close="coverVisible = false"
        position="top">
            <mu-content-block>
                <img :src="cover"/>
            </mu-content-block>
        </mu-popup>
        <mu-popup
        popupClass="notification"
        position="top"
        :open="notificationVisible"
        @close="notificationVisible = false"
        >
        {{ mode === MODE.ADD ? '添加成功' : '修改成功' }}
        </mu-popup>
    </mu-content-block>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import { mapActions, mapState } from 'vuex';

const MODE = { EDIT: 0, ADD: 1 }

export default {
    components: {
        VueMarkdown
    },
    methods: {
        handleOpenUploadDialog () {
            document.getElementById('fileUpload').click()
        },
        handleUploadCover ({ target: item }) {
            const { files } = item
            if (files.length !== 0) {
                this.uploadCover(files[0])
                .then(res => this.cover = res.data.url)
            }
        },
        handlePasteImage (e) {
            const { target: textArea, clipboardData: data} = e
            if (data.items.length !== 0) {
                const image = data.items[0]
                if (image.type.indexOf('image') === -1) {
                   return 
                }
                const token = Math.random().toString(36).slice(2, 7)
                const cursorPosition = textArea.selectionStart
                this.content = this.content.slice(0, cursorPosition)
                + `![image](${token})`
                + this.content.slice(cursorPosition + 1)
                this.uploadCover(image.getAsFile())
                .then(res => {
                    const { url } = res.data
                    this.content = this.content.replace(token, url)
                    e.preventDefault()
                })
            }
        },
        handleSelectSuggestions (item) {
            this.selectedTags.push(item)
        },
        handleTagSelectorChange (value) {
            console.log(this.selectedTags)
            if (this.selectedTags.filter( t => t === value).length !== 0) {
                setTimeout(() => this.tagSelectorText = '', 1)
            }
        },
        handleRemoveTags (index) {
            this.selectedTags = [...this.selectedTags.slice(0, index), ...this.selectedTags.slice(index + 1)]
        },
        handleCreateNewTag () {
            this.selectedTags.push(this.tagSelectorText)
            this.tagSelectorText = ''
        },
        handleContentChange (e) {
            this.content = e.target.value
        },
        handlepublishPost () {
            const { title, cover, abstract, content, selectedTags: tags } = this
            if (this.mode === MODE.ADD) {
                this.publishPost({
                title, cover, abstract, content, tags
            })
            .then((res) => {
                this.notificationVisible = true
                this.$router.push(`/admin/post/${res.data.id}/`)
            })
            } else {
                this.updatePost({
                    id: this.postDetail.data.id,
                    title, cover, abstract, content, tags
                })
                .then((res) => {
                    this.notificationVisible = true
                    return this.loadPostDetail(res.id)
                })
            }
        },
        ...mapActions([ 'uploadCover', 'publishPost', 'getUserInfo', 'loadPostDetail', 'updatePost' ])
    },
    data () {
        return {
            title: '',
            cover: '',
            abstract: '',
            content: '',
            tagSelectorText: '',
            selectedTags: [],
            inPreview: false,
            coverVisible: false,
            notificationVisible: false,
            mode: MODE.ADD
        }
    },
    computed: {
        MODE () { return MODE },
        tagSuggestions () {
            return this.tags.map(t => t.name)
            .filter(t => this.selectedTags.indexOf(t) === -1) 
        },
        ...mapState(['postDetail']),
        ...mapState({ tags: state => state.tag.data })
    },

    mounted () {
        this.$refs.content.$el.addEventListener('paste', this.handlePasteImage)
        this.$store.watch(() => this.postDetail.data, (value, oldValue) => {
            this.title = value.title
            this.cover = value.cover
            this.abstract = value.abstract
            this.content = value.content
            this.selectedTags = value.tags.map( t => t.name)
        })
        const { id } = this.$route.params
        if (id) {
            this.mode = MODE.EDIT
            this.loadPostDetail(id)
        }
    },
    beforeDestroy () {
        this.$refs.content.$el.removeEventListener('paste', this.handlePasteImage)
    },
}
</script>
<style lang="scss" scoped>
    #fileUpload {
        display: none;
    }
    .markdown-preview {
        min-height: 342px;
        width: 1147px;
        padding: 28px 0 12px 0;
    }
    .mu-chip {
        margin-right: 10px;
    }
    .mu-paper {
        padding: 20px;
        margin: 10px 0;
    }
</style>
<style>
    .mu-popup-top.notification {
        width: 100%;
        opacity: .8;
        height: 48px;
        line-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 375px;
    }
</style>
