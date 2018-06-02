<template>
    <div class="setting">
        <van-cell-group>
            <van-cell title="个人信息" is-link class="no_left" to="/user/setting/info"/>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "setting",
        data(){
            return {
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