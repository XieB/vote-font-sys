<template>
    <div id="app">
        <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
    .main{
        padding: 0 10px;
    }
    .no_left:after{
        left: 0 !important;
    }
    .foot_h:after{
        content: '';
        display: block;
        height: 50px;
    }

    .add_vote .van-cell__title{
        text-align: left;
    }
    .edit_vote .van-cell__title{
        text-align: left;
    }
    .plr10{
        padding: 0 10px;
    }
    .mlr10{
        margin: 0 10px;
    }
    .mt10{
        margin-top: 10px;
    }
    .van-cell-swipe__right{
        color: #FFFFFF;
        font-size: 15px;
        width: 65px;
        height: 44px;
        display: inline-block;
        text-align: center;
        line-height: 44px;
        background-color: #F44;
    }
    .ps-re{
        position: relative;
    }
    .error_tips{
        position: absolute;
        right: 0;
    }
    .input-error{
        transition: all 0.3s;
        background-color: #f85 !important;
    }
    .input-error input,.input-error textarea{
        transition: all 0.3s;
        background-color: #f85;
    }

</style>
