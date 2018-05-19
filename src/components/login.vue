<template>
    <div class="main login">
        <div>
            <van-cell-group>
                <van-field
                        v-model="username"
                        label="用户名"
                        placeholder="请输入用户名"
                        required
                />

                <van-field
                        v-model="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        required
                />
            </van-cell-group>
            <van-button type="primary" size="large" class="button">登录</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                username: '',
                password: '',
            }
        }
    }
</script>

<style lang="less" scoped>
.login{
    display: flex;
    align-items: center;
    height: 90vh;
    & > div{
        width: 100%;
    }
    .button{
        margin-top: 40px;
    }
}
</style>