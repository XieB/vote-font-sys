<template>
    <div class="index foot_h">
        <router-view></router-view>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="more" to="/m_root/vote">投票列表</van-tabbar-item>
            <van-tabbar-item icon="setting" to="/m_root/setting">管理</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                active: '',
            }
        },
        created() {
            let routePath = this.$route.path;
            if (routePath.indexOf('/m_root/vote') == 0) {
                this.active = 0;
            } else if (routePath.indexOf('/m_root/setting') == 0) {
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