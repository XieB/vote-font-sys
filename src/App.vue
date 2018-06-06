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

<style lang="less">
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
        height: 60px;
    }

    .add_vote .van-cell__title,.edit_vote .van-cell__title,.info .van-cell__title{
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
    .van-cell-swipe__right,.van-cell-swipe__left{
        color: #FFFFFF;
        font-size: 15px;
        width: 65px;
        height: 44px;
        display: inline-block;
        text-align: center;
        line-height: 44px;
        background-color: #F44;
    }
    .van-cell-swipe__left{
        background-color: #4b0;
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
    .last_line{
        color: #999 !important;
        padding: 20px 0 !important;
    }
    .no_data{
        padding: 20px;
        text-align: center;
        color: #999;
    }

    .add_vote{
        .add_new_options{
            .van-field__icon {
                display: inline-block !important;
                .van-icon-success{
                    color: #4b0;
                }
            }
        }
        .select_option{
            .van-cell__title{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .right-icon{
                color: #f44;
            }
            .right-icon-deny{
                color: rgba(69, 90, 100, 0.6);
            }
        }
    }


</style>
