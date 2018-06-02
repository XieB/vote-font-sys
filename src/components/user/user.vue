<template>
    <div class="user foot_h">
        <router-view></router-view>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="more" to="/user/vote">投票</van-tabbar-item>
            <van-tabbar-item icon="setting" to="/user/setting">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "user",
        data() {
            return {
                active: '',
            }
        },
        created() {
            let routePath = this.$route.path;
            if (routePath.indexOf('/user/vote') == 0) {
                this.active = 0;
            } else if (routePath.indexOf('/user/setting') == 0) {
                this.active = 1;
            }
        }
    }
</script>

<style lang="less" scoped>
    .van-tabbar-item--active{
        color: #4b0;
    }
</style>