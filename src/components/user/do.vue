<template>
    <div class="vote_do">

        <template v-if="info.type == 2">
            <p class="dl_title">{{info.title}}(最多选{{info.maxVote}}项)</p>
            <!--<van-panel title="多选" :desc="`最多选${info.maxVote}项`" class="title"/>-->
            <van-checkbox-group v-model="checkbox" :max="info.maxVote">
                <van-cell-group>
                    <van-cell v-for="item in options" :title="item.name" :key="item.id">
                        <van-checkbox :name="item.id" />
                    </van-cell>
                </van-cell-group>
                <div class="plr10 mt10">
                    <van-button type="primary" size="large" class="button" @click="submitCheckBox" :loading="submitLoading">提交</van-button>
                </div>
            </van-checkbox-group>
        </template>
        <template v-if="info.type == 1">
            <p class="dl_title">{{info.title}}(单选)</p>
            <!--<van-panel title="单选" class="title"/>-->
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell :title="item.name" clickable @click="radio = item.id" v-for="item in options">
                        <van-radio :name="item.id" />
                    </van-cell>
                </van-cell-group>
                <div class="plr10 mt10">
                    <van-button type="primary" size="large" class="button" @click="submitRadio" :loading="submitLoading">提交</van-button>
                </div>
            </van-radio-group>
        </template>
        <!--<van-popup v-model="ajaxLoadding">-->
            <!--<van-loading color="black"/>-->
        <!--</van-popup>-->

    </div>
</template>

<script>
    import {getUserOneVote,getUserOptions,voteRadio,voteCheckBox,hasVote} from '@/axios';
    import { Toast } from 'vant';
    export default {
        name: "do",
        data(){
            return {
                checkbox: [],
                radio: '',
                submitLoading: false,
                info: {},
                options: [],
                // ajaxLoadding: true,
            }
        },
        created(){
            let _id = this.$route.params.id;
            hasVote(_id).then(async res=>{
                if (!res.data.status){  //已投票跳转结果页
                    this.$router.replace({name: 'result',params : {_id}});
                    return false;
                }
                let _vote = await getUserOneVote(_id);
                if (_vote.data.status) this.info = _vote.data.data;
                let _options =  await getUserOptions(_id);
                if (_options.data.status){
                    this.options.push(..._options.data.data);
                    // this.ajaxLoadding = false;
                }
            })

        },
        methods:{
            submitRadio(){
                if (!this.radio){
                    Toast('请选择');
                    return false;
                }
                this.submitLoading = true;
                voteRadio(this.radio,this.info.id).then(res=>{
                    if (res.data.status){
                        Toast('投票成功，即将为您跳转');
                        setTimeout(()=>{
                            this.$router.replace('/user/vote');
                        },2000)
                    }else{
                        Toast(res.data.info);
                        this.submitLoading = false;
                    }
                })
            },
            submitCheckBox(){
                if (!this.checkbox.length) {
                    Toast('请至少选择一项');
                    return false;
                }
                this.submitLoading = true;
                voteCheckBox(this.checkbox,this.info.id).then(res=>{
                    if (res.data.status){
                        Toast('投票成功，即将为您跳转');
                        setTimeout(()=>{
                            this.$router.replace('/user/vote');
                        },2000)
                    }else{
                        Toast(res.data.info);
                        this.submitLoading = false;
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .vote_do{
        .title{
            .van-cell{
                background-color: #f8f8f8;
                span{
                    font-size: 16px;
                }
            }
        }
    }
</style>
<style lang="less" scoped>
.vote_do{
    .title{
    }
    .van-popup{
        background-color: transparent;
    }
}
</style>