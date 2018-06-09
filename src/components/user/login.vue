<template>
    <div class="user_login">
        <van-popup v-model="ajaxLoading">
            <van-loading color="black"/>
        </van-popup>
    </div>
</template>

<script>
    const queryString = require('query-string');
    import { getTokenFromWechatCode } from '@/axios';
    import { Toast } from 'vant';
    import { setToken,setWxCode,getWxCode,reviseUrl,clearWxCode } from '@/utils';
    export default {
        name: "login",
        data(){
            return {
                ajaxLoading: true,
            }
        },
        created(){
            let url = queryString.parse(location.search);
            if (!url.code && getWxCode() == null){
                this.ajaxLoading = false;
                Toast('请勿直接打开该页面');
                return;
            }
            if (url.code) {
                setWxCode(url.code);
                reviseUrl();
                return;
            }

            if (getWxCode()){
                getTokenFromWechatCode(getWxCode()).then(res=>{
                    if (res.data.status){
                        setToken(res.data.data.token);
                        if (res.data.data.isExamine){
                            this.$router.replace({name: 'userVote'});
                        }else{
                            this.$router.replace({name: 'userInfo'});
                        }
                    }else{
                        Toast('登录失败，请稍后再试');
                    }
                })
            }
        },
        destroyed(){
            clearWxCode();    //window.location.href不触发该钩子
        }
    }
</script>

<style scoped lang="less">
.user_login{
    .van-popup{
        background-color: transparent;
    }
}
</style>