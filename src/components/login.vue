<template>
    <div class="main login">
        <div>
            <van-cell-group>
                <van-field
                        v-model="username"
                        label="用户名"
                        placeholder="请输入用户名"
                        required
                        v-validate="'required|email'"
                        name="email"
                />
                <span v-show="errors.has('email')" class="error_tips">{{ errors.first('email') }}</span>

                <van-field
                        v-model="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        required
                />
            </van-cell-group>
            <van-button type="primary" size="large" class="button" @click="submit">登录</van-button>
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
        },
        methods:{
            submit(){
                console.log(this.errors);
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