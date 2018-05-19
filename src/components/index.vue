<template>
    <div class="main">
        <router-view></router-view>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="more" to="/vote">投票</van-tabbar-item>
            <van-tabbar-item icon="setting" to="/setting">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                active: 0,
            }
        }
    }
</script>

<style scoped>

</style>