<template>
    <div class="info">
        <div class="flex_cc header_img">
            <img :src="headerImg" alt="">
        </div>
        <van-cell-group>
            <van-field
                    v-model="info.realName"
                    label="真实姓名"
                    placeholder="请输入真实姓名"
                    required
                    type="text"
                    v-checkParam="{required:true}"
                    :disabled="examine"
            />

            <van-field
                    v-model="info.mobile"
                    label="手机号码"
                    placeholder="请输入手机号码"
                    required
                    type="text"
                    v-checkParam="{required:true,regex:/^[1][3,4,5,7,8][0-9]{9}$/}"
                    :disabled="examine"
            />
        </van-cell-group>
        <div class="plr10 mt10" v-if="!examine">
            <van-button type="primary" size="large" class="button" @click="submit" :loading="submitLoading">提交</van-button>
        </div>
        <div class="plr10 mt10" v-else>
            <van-button type="primary" size="large" class="button" disabled>已审核通过无法修改</van-button>
        </div>

        <van-popup v-model="ajaxLoading">
            <van-loading color="black"/>
        </van-popup>
    </div>
</template>

<script>
    import {updateUserInfo,getUserInfo} from '@/axios';
    import { Toast } from 'vant';
    import { reviseUrl } from "@/utils";
    export default {
        name: "info",
        data(){
            return {
                info: {
                    realName: '',
                    mobile: '',
                },
                submitLoading: false,
                examine: false, //已审核通过无法修改信息
                ajaxLoading: true,
                headerImg: '',
            }
        },
        created(){
            reviseUrl();
            getUserInfo().then(res=>{
                this.ajaxLoading = false;
                if (res.data.status){
                    let _data = res.data.data;
                    this.info.realName = _data.realName;
                    this.info.mobile = _data.mobile;
                    this.headerImg = _data.headimgurl;
                    if (_data.examine){
                        this.examine = true;
                    }
                }
            })
        },
        methods:{
            submit(){
                this.$VerifyAll().then(res=>{
                    if (res){
                        updateUserInfo(this.info).then(res=>{
                            if (res.data.status){
                                Toast('修改成功，请耐心等待审核');
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
    .info{
        .header_img{
            padding: 40px 0;
            img{
                max-width: 100%;
            }
        }
        .van-popup{
            background-color: transparent;
        }
    }
</style>