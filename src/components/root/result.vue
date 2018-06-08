<template>
    <div class="vote_result">
        <p class="dl_title">投票结果({{nums}}人参与)</p>
        <van-list>
            <van-cell v-for="item in list" :key="item.id" class="cell">
                <van-col span="7">{{item.name}}</van-col>
                <van-col span="16" offset="1" >
                    <van-progress :percentage="item.percentage"
                                  :pivot-text="`${item.voteNum}票`"
                                  color="#4b0"
                                  class="progress"
                    />
                </van-col>
            </van-cell>
        </van-list>
        <div class="plr10 mt10">
            <van-button type="primary" size="large" class="button" @click="goBack" >返回</van-button>
        </div>
        <!--<van-popup v-model="ajaxLoadding">-->
        <!--<van-loading color="black"/>-->
        <!--</van-popup>-->
    </div>
</template>

<script>
    import {getAdminVoteResult,getAdminVotePersonNums} from '@/axios';
    import { Toast } from 'vant';
    export default {
        name: "result",
        data(){
            return {
                list: [],
                // ajaxLoadding: true,
                nums: 0,
            }
        },

        created(){
            let _id = this.$route.params.id;
            getAdminVoteResult(_id).then(res=>{
                if (res.data.status){
                    this.list.push(...res.data.data);
                }else{
                    Toast(res.data.info);
                }
                // this.ajaxLoadding = false;
                getAdminVotePersonNums(_id).then(res=>{
                    if (res.data.status){
                        this.nums = res.data.data;
                    }
                })
            })
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="less">
    .vote_result{
        .cell{
            .van-cell__value{
                display: flex;
                align-items: center;
                /*.progress{*/
                /*background-color: transparent;*/
                /*}*/
            }
        }
        .van-popup{
            background-color: transparent;
        }
    }

</style>

<style lang="less" scoped>
</style>