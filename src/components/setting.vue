<template>
    <div class="setting">
        <van-cell-group>
            <van-cell title="新增投票" is-link class="no_left" to="/setting/add"/>
            <van-cell title="修改密码" is-link class="no_left" to="/setting/resetPass"/>
            <van-cell title="审核" is-link class="no_left" to="/setting/examine"/>
            <van-cell title="人员列表" is-link class="no_left" to="/setting/memberList"/>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "setting",
        data(){
            return {
                settingInfo : {
                    oldPassword : '',
                    newPassword : '',
                    rePassword : '',
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.setting{
    /*margin-top: 40px;*/
    .button{
        margin-top: 40px;
    }
}
</style>