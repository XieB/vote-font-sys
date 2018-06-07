<template>
    <div class="add_vote">

        <van-radio-group v-model="info.type" class="group" :disabled="voteIsStart">
            <van-cell-group>
                <van-field
                        v-model="info.title"
                        label="标题"
                        placeholder="请输入标题"
                        required
                        type="text"
                        v-checkParam="{required:true}"
                        :disabled="voteIsStart"
                />

                <template v-if="!voteIsStart">
                    <van-cell title="单选" clickable @click="info.type = 1">
                        <van-radio :name="1" />
                    </van-cell>
                    <van-cell title="多选" clickable @click="info.type = 2">
                        <van-radio :name="2" />
                    </van-cell>
                </template>
                <template v-else>
                    <van-cell title="单选" clickable>
                        <van-radio :name="1" />
                    </van-cell>
                    <van-cell title="多选" clickable>
                        <van-radio :name="2" />
                    </van-cell>
                </template>


                <van-field
                        v-model="info.maxVote"
                        label="最大票数"
                        placeholder="请输入每人最大投票数"
                        v-if="info.type == 2"
                        required
                        type="number"
                        v-checkParam="{required:true}"
                        :disabled="voteIsStart"
                />

                <van-field
                        v-model="info.startTime"
                        label="开始时间"
                        placeholder="开始时间，默认当前时间"
                        @click="showStartTimeSelect"
                        readonly
                        :disabled="voteIsStart"
                />

                <van-field
                        v-model="info.endTime"
                        label="结束时间"
                        placeholder="结束时间"
                        required
                        @click="showEndTimeSelect"
                        readonly
                        v-checkParam="{required:true}"
                />

                <section>
                    <p class="dl_title">选项</p>
                    <van-list>
                        <van-cell v-for="(item,index) in info.nameList" :key="index" :title="item + ''" class="select_option" >
                            <van-icon slot="right-icon" name="delete" class="right-icon" @click="delOption(item,index)" v-if="!voteIsStart" />
                            <van-icon slot="right-icon" name="delete" class="right-icon-deny" v-else />
                        </van-cell>
                    </van-list>
                </section>

                <van-field
                        v-model="newField"
                        placeholder="插入新选项"
                        rows="1"
                        autosize
                        icon="success"
                        @click-icon="addOptions"
                        class="add_new_options"
                        v-if="!voteIsStart"
                />

            </van-cell-group>
        </van-radio-group>
        <div class="plr10 mt10">
            <van-button type="primary" size="large" class="button" @click="submit" :loading="submitLoading">提交</van-button>
        </div>

        <transition name="top" mode="out-in">
            <van-datetime-picker
                    v-model="startTime.currentDate"
                    type="datetime"
                    :min-date="startTime.minDate"
                    :loading="true"
                    title="选择开始时间"
                    @confirm="submitStartTime"
                    @cancel="startTime.isShow = false"
                    v-show="startTime.isShow"
                    cancel-button-text="关闭"
            />
        </transition>

        <transition name="top" mode="out-in">
            <van-datetime-picker
                    v-model="endTime.currentDate"
                    type="datetime"
                    :min-date="endTime.minDate"
                    :loading="true"
                    title="选择结束时间"
                    @confirm="submitEndTime"
                    @cancel="endTime.isShow = false"
                    v-show="endTime.isShow"
                    cancel-button-text="关闭"
            />
        </transition>

        <van-popup v-model="ajaxLoadding">
            <van-loading color="black"/>
        </van-popup>

    </div>
</template>

<script>

    import {editVote,getOneVote,deleteOption,addOption} from '@/axios';
    import { Toast } from 'vant';
    const dayjs = require('dayjs');
    let _time = dayjs();
    export default {
        name: "editVote",
        data() {
            return {
                info: {
                    title: '',
                    type: '',
                    maxVote: '',
                    startTime: '',
                    endTime: '',
                    nameList: [],
                },
                startTime: {
                    isShow: false,
                    minDate: _time.toDate(),
                    currentDate: '',
                },
                endTime: {
                    isShow: false,
                    minDate: _time.toDate(),
                    currentDate: '',
                },
                ajaxLoadding: true,
                submitLoading: false,
                voteIsStart: false, //已开投票仅可修改结束时间
                newField: '',
            }
        },
        created(){
            let _id = this.$route.params.id;
            getOneVote(_id).then(res=>{
                if (res.data.status){
                    this.ajaxLoadding = false;
                    this.info = res.data.data;
                    let _startTime = dayjs(res.data.data.startTime).unix();
                    let _nowTime = _time.unix();
                    if (_startTime <= _nowTime){
                        this.voteIsStart = true;
                    }
                }else{
                    Toast('未找到该记录');
                }
            })

        },
        watch:{
            'info.startTime' : function(){
                this.startTime.currentDate = dayjs(this.info.startTime).toDate();
            },
            'info.endTime' : function(){
                this.endTime.currentDate = dayjs(this.info.endTime).toDate();
            },
        },
        methods:{
            submitStartTime(value){
                this.info.startTime = dayjs(value).format('YYYY-MM-DD HH:mm');
                this.startTime.isShow = false;
            },
            submitEndTime(value){
                this.info.endTime = dayjs(value).format('YYYY-MM-DD HH:mm');
                this.endTime.isShow = false;
            },
            showStartTimeSelect(){
                this.isShowStartTimeSelect(true);
            },
            showEndTimeSelect(){
                this.isShowStartTimeSelect(false);
            },
            isShowStartTimeSelect(booleanValue){
                this.startTime.isShow = booleanValue;
                this.endTime.isShow = !booleanValue;
            },

            submit(){
                this.$VerifyAll().then(res=>{
                    this.submitLoading = true;
                    editVote(this.info).then(res=>{
                        this.submitLoading = false;
                        if (res.data.status){
                            Toast('修改成功');
                        }else{
                            Toast(res.data.info);
                        }
                    })
                })

            },
            addOptions(){
                let _fieldValue = this.newField.trim();
                if (_fieldValue != ''){
                    addOption(this.info.id,_fieldValue).then(res=>{
                        if (res.data.status){
                            this.info.nameList.push(_fieldValue);
                            this.newField = '';
                        }else{
                            Toast('添加失败');
                        }
                    })
                }
            },
            delOption(name,index){
                if (this.info.nameList.length <= 1){
                    Toast('请至少保留一个选项');
                    return false;
                }
                deleteOption(name,this.info.id).then(res=>{
                    console.log(res);
                    if (res.data.status){
                        this.info.nameList.splice(index,1);
                    }else{
                        Toast('删除失败');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .add_vote{
        .group{
            /*margin-top: 10px;*/
        }
        .van-picker{
            position: fixed;
            z-index: 99;
            top: 60vh;
            right: 0;
            left: 0;
            bottom: 0;
        }
        .top-enter-active, .top-leave-active {
            transition: top .3s;
        }
        .top-enter, .top-leave-to {
            top: 100vh;
        }
        .van-popup{
            background-color: transparent;
        }
    }
</style>