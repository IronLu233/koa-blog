<template>
    <mu-content-block>
        <mu-text-field v-model="title" label="标题" labelFloat fullWidth/>
        <mu-text-field v-model="abstract" label="简介" labelFloat fullWidth/>
        <mu-raised-button @click="handleOpenUploadDialog" icon="file_upload" label="上传封面">
            <input
            id="fileUpload"
            @change="handleUploadCover"
            type="file"
            accept="image/*"
            ref="fileInputField"/>
        </mu-raised-button>
        <mu-raised-button
        icon="visibility"
        backgroundColor="lightBlue500"
        label="预览"
        @click="inPreview = !inPreview" />
        <vue-markdown
        :show="inPreview"
        :watches="['show']"
        :class="{'markdown-preview': inPreview}"
        :source="content"/>
        <mu-text-field v-show="!inPreview" v-model="content" label="正文" multiLine :rows="16"  labelFloat fullWidth/>
        <mu-raised-button icon="done" label="发布" backgroundColor="cyan500" primary fullWidth/>
    </mu-content-block>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import { mapActions } from 'vuex';
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
        ...mapActions(['uploadCover'])
    },
    data () {
        return {
            title: '',
            cover: '',
            abstract: '',
            content: '',
            inPreview: false,
        }
    }
}
</script>
<style lang="scss" scoped>
    #fileUpload {
        display: none;
    }
    .markdown-preview {
        height: 424px;
        width: 1147px;
        padding: 28px 0 12px 0;
    }
</style>
