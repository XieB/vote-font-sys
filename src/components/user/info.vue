<template>
    <div class="info">
        <van-cell-group>
            <van-field
                    v-model="info.realName"
                    label="真实姓名"
                    placeholder="请输入真实姓名"
                    required
                    type="text"
                    v-checkParam="{required:true}"
            />

            <van-field
                    v-model="info.mobile"
                    label="手机号码"
                    placeholder="请输入手机号码"
                    required
                    type="text"
                    v-checkParam="{required:true}"
            />
        </van-cell-group>
        <div class="plr10 mt10">
            <van-button type="primary" size="large" class="button" @click="submit" :loading="submitLoading">提交审核</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "info",
        data(){
            return {
                info: {
                    realName: '',
                    mobile: '',
                },
                submitLoading: false,
            }
        },
        methods:{
            submit(){
                this.$VerifyAll().then(res=>{
                    if (res){

                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .info{
        margin-top: 60px;
    }
</style>