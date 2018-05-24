<template>
    <div id="app">
        <router-view></router-view>
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
</style>
