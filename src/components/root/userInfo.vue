<template>
    <div class="admin_user_info">
        <div class="flex_cc header_img">
            <img :src="info.headimgurl" alt="">
        </div>
        <van-list>
            <van-cell class="cell no_left">
                <van-col span="4">姓名：</van-col>
                <van-col span="19" offset="1" >{{info.realName}}</van-col>
            </van-cell>
            <van-cell class="cell no_left">
                <van-col span="4">电话：</van-col>
                <van-col span="19" offset="1" >{{info.mobile}}</van-col>
            </van-cell>
            <van-cell class="cell no_left">
                <van-col span="4">昵称：</van-col>
                <van-col span="19" offset="1" >{{info.nickname}}</van-col>
            </van-cell>
            <van-cell class="cell no_left">
                <van-col span="4">性别：</van-col>
                <van-col span="19" offset="1" >{{sexStr}}</van-col>
            </van-cell>
            <!--<van-cell class="cell no_left">-->
                <!--<van-col span="4">国家：</van-col>-->
                <!--<van-col span="19" offset="1" >{{info.country}}</van-col>-->
            <!--</van-cell>-->
            <!--<van-cell class="cell no_left">-->
                <!--<van-col span="4">省份：</van-col>-->
                <!--<van-col span="19" offset="1" >{{info.province}}</van-col>-->
            <!--</van-cell>-->
            <!--<van-cell class="cell no_left">-->
                <!--<van-col span="4">城市：</van-col>-->
                <!--<van-col span="19" offset="1" >{{info.city}}</van-col>-->
            <!--</van-cell>-->
        </van-list>
        <div class="plr10 mt10" v-if="!info.examine">
            <van-button type="primary" size="large" class="button" @click="userExamine()" :loading="submitLoading">审核通过</van-button>
        </div>
        <div class="plr10 mt10">
            <van-button type="danger" size="large" class="button" @click="deleteUser()" :loading="submitLoading">删除该用户</van-button>
        </div>
    </div>
</template>

<script>
    import {getOneUserInfo,examineUser,deleteMember} from '@/axios';
    import { Toast,Dialog } from 'vant';
    export default {
        name: "userInfo",
        data(){
            return {
                info: {
                    examine: true,
                },
                submitLoading: false,
            }
        },
        created(){
            let _id = this.$route.params.id;
            getOneUserInfo(_id).then(res=>{
                if (res.data.status){
                    this.info = res.data.data;
                } else {
                    Toast('获取用户信息失败');
                }
            })
        },
        computed:{
            sexStr: function(){
                let sex = this.info.sex + '';   //转为字符串
                switch (sex){
                    case '1':
                        return '男';
                        break;
                    case '2':
                        return '女';
                        break;
                    case '0':
                        return '未知';
                        break;
                }
            }
        },
        methods: {
            userExamine(){
                Dialog.confirm({
                    message: '确定审核通过吗？'
                }).then(()=>{
                    this.submitLoading = true;
                    examineUser(this.$route.params.id).then(res=>{
                        if (res.data.status){
                            this.$router.replace({name: 'examine'});
                        }else{
                            Toast('审核失败');
                            this.submitLoading = false;
                        }
                    })
                })

            },
            deleteUser(){
                Dialog.confirm({
                    message: '确定删除吗？'
                }).then(()=>{
                    this.submitLoading = true;
                    deleteMember(this.$route.params.id).then(res=>{
                        if (res.data.status){
                            this.$router.replace({name: 'examine'});
                        }else{
                            Toast('删除失败');
                            this.submitLoading = false;
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.admin_user_info{
    .header_img{
        padding: 20px 0;
    }
}
</style>