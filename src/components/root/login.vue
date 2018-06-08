<template>
    <div class="main login">
        <div>
            <div class="flex_cc admin_img">
                <van-icon name="pending-payment" />
            </div>
            <van-cell-group>
                <van-field
                        v-model="username"
                        label="用户名"
                        placeholder="请输入用户名"
                        required
                        v-checkParam="{required:true}"
                />

                <van-field
                        v-model="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        required
                        v-checkParam="{required:true}"
                />
            </van-cell-group>
            <van-button type="primary" size="large" class="button" @click="submit"  :loading="submitLoading">登录</van-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import {adminLogin} from '@/axios';
    import {setToken} from "@/utils";

    export default {
        name: "login",
        data(){
            return {
                username: '',
                password: '',
                submitLoading: false,
            }
        },
        methods:{
            submit(){
                this.$VerifyAll().then(res=>{
                    this.submitLoading = true;
                    if (res){
                        adminLogin(this.username,this.password).then(res=>{
                            if (res.data.status){
                                setToken(res.data.data);
                                this.$router.push({name: 'voteManager'});
                            }else{
                                Toast(res.data.info);
                                this.submitLoading = false;
                            }
                        })
                    }
                })

            }
        }
    }
</script>

<style lang="less" scoped>
.login{
    /*display: flex;*/
    /*align-items: center;*/
    /*height: 90vh;*/
    & > div{
        width: 100%;
        .admin_img{
            font-size: 80px;
            padding: 40px 0;
            color: rgba(69, 90, 100, .6);
        }
    }
    .button{
        margin-top: 40px;
    }
}
</style>