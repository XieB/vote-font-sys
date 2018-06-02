<template>
    <div class="vote_result">
        <ul>
            <li>
                <div class="name">李丽丽</div>
                <van-progress :percentage="50"
                              pivot-text="10票"
                              color="#4b0"
                />
            </li>
            <li>
                <div class="name">李丽丽谢谢</div>
                <van-progress :percentage="30"
                              pivot-text="8票"
                              color="#4b0"
                />
            </li>
            <li>
                <div class="name">李丽丽2</div>
                <van-progress :percentage="20"
                              pivot-text="6票"
                              color="#4b0"
                />
            </li>
            <li>
                <div class="name">李丽丽x</div>
                <van-progress :percentage="0"
                              pivot-text="0票"
                              color="#4b0"
                />
            </li>
        </ul>
        <div class="plr10 mt10">
            <van-button type="primary" size="large" class="button" @click="goBack" >返回</van-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "result",
        data(){
            return {

            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="less" scoped>
    .vote_result{
        ul{
            li{
                padding: 12px 15px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #e5e5e5;
                font-size: 14px;
                .name{
                    flex: 3;
                    text-align: left;
                }
                .van-progress{
                    flex: 7;
                    height: 6px;
                    background-color: transparent;
                }
            }
        }
    }
</style>