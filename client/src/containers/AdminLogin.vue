<template>
<mu-flexbox justify="center" align="align">
    <mu-paper>
        <mu-text-field
        label="用户名"
        v-model="username"
        :errorText="errorMessage.username"
        labelFloat
        @focus="clearErrorMessage"
        icon="account_box"/><br/>
        <mu-text-field
        label="密码"
        v-model="password"
        type="password"
        @focus="clearErrorMessage"
        :errorText="errorMessage.password"
        labelFloat icon="vpn_key"/><br/>
        <mu-raised-button
        label="登录"
        :disabled="username.length === 0 || password.length === 0"
        @click="handleLoginButtonClick"
        icon="arrow_forward"
        labelPosition="before"
        fullWidth/>
    </mu-paper>
</mu-flexbox>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    methods: {
        handleLoginButtonClick: function () {
            const { username, password } = this
            this.login({ username, password })
            .then(res => {
                this.$router.push('/admin/post/')
            })
            .catch(error => {
                if (error.response.status === 404) {
                    this.errorMessage.username = '账号不存在'
                    this.username = this.password = ''
                } else if (error.response.status === 401) {
                    this.errorMessage.password = '密码错误'
                    this.password = ''
                }
            })
        },
        clearErrorMessage: function () {
            this.errorMessage = {
                username: '',
                password: '',
            }
        },
        ...mapActions(['login', 'getUserInfo'])
    },
    mounted () {
        this.getUserInfo()
        if (this.user.isLogin) {
            this.$router.push('/admin/post/')
        }
        this.$store.watch(() => this.user.isLogin, isLogin => {
            if (isLogin) {
                this.$router.push('/admin/post/')
            }
        })
    },
    computed: {
        ...mapState(['user'])
    },
    data: function () {
        return {
            username: '',
            password: '',
            errorMessage: {
                username: '',
                password: '',
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .mu-flexbox {
        height: calc(100vh - 64px);

        .mu-paper {
            padding: 100px 130px;
        }
    }
    .mu-raised-button {
        margin-top: 40px;
    }
</style>
