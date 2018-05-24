<template>
    <div class="reset_pass plr10">
        <van-cell-group>
            <van-field
                    v-model="settingInfo.oldPassword"
                    label="原密码"
                    placeholder="请输入原密码"
                    required
            />

            <van-field
                    v-model="settingInfo.newPassword"
                    type="password"
                    label="新密码"
                    placeholder="请输入新密码"
                    required
            />
            <van-field
                    v-model="settingInfo.rePassword"
                    type="password"
                    label="重复密码"
                    placeholder="请重复新密码"
                    required
            />
        </van-cell-group>
        <van-button type="primary" size="large" class="button">保存</van-button>
    </div>
</template>

<script>
    export default {
        name: "resetPass",
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
    .reset_pass{
        margin-top: 40px;
        .button{
            margin-top: 40px;
        }
    }
</style>