<template>
    <div class="reset_pass plr10">
        <van-cell-group>
            <van-field
                    v-model="info.oldPass"
                    label="原密码"
                    type="password"
                    placeholder="请输入原密码"
                    required
                    v-checkParam="{required:true}"
            />

            <van-field
                    v-model="info.newPass"
                    type="password"
                    label="新密码"
                    placeholder="请输入新密码"
                    required
                    v-checkParam="{required:true}"
            />
            <van-field
                    v-model="info.reNewPass"
                    type="password"
                    label="重复密码"
                    placeholder="请重复新密码"
                    required
                    v-checkParam="{required:true}"
            />
        </van-cell-group>
        <van-button type="primary" size="large" class="button" @click="submit">保存</van-button>
    </div>
</template>

<script>
    import {resetPass} from '@/axios';
    import { Toast } from 'vant';
    export default {
        name: "resetPass",
        data(){
            return {
                info : {
                    oldPass : '',
                    newPass : '',
                    reNewPass : '',
                }
            }
        },
        methods:{
            submit(){
                this.$VerifyAll().then(res=>{
                    if (res){
                        if (this.info.newPass != this.info.reNewPass){
                            Toast('两次密码不一致');
                            return false;
                        }
                        resetPass(this.info).then(res=>{
                            if (res.data.status){
                                Toast('修改成功');
                            }else{
                                Toast(res.data.info);
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .reset_pass{
        margin-top: 40px;
        .button{
            margin-top: 40px;
        }
    }
</style>