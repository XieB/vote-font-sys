<template>
    <div class="add_vote">

        <van-radio-group v-model="info.type" class="group">
            <van-cell-group>
                <van-field
                        v-model="info.title"
                        label="标题"
                        placeholder="请输入标题"
                        required
                        type="text"
                        v-checkParam="{required:true}"
                />

                <van-cell title="单选" clickable @click="info.type = '1'">
                    <van-radio name="1" />
                </van-cell>
                <van-cell title="多选" clickable @click="info.type = '2'">
                    <van-radio name="2" />
                </van-cell>
                <!--<van-field v-model="info.maxVote" placeholder="" />-->

                <van-field
                        v-model="info.maxVote"
                        label="最大票数"
                        placeholder="请输入每人最大投票数"
                        v-if="info.type == 2"
                        required
                        type="number"
                        v-checkParam="{required:true}"
                />

                <van-field
                        v-model="info.startTime"
                        label="开始时间"
                        placeholder="开始时间，默认当前时间"
                        @click="showStartTimeSelect"
                        readonly
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

                <van-field
                        v-model="info.nameList"
                        label="名单"
                        type="textarea"
                        placeholder="人员列表，以英文逗号分隔"
                        rows="1"
                        autosize
                        required
                        v-checkParam="{required:true}"
                />
            </van-cell-group>
        </van-radio-group>
        <div class="plr10 mt10">
            <van-button type="primary" size="large" class="button" @click="submit">提交</van-button>
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
    </div>
</template>

<script>
    import {addVote} from '@/axios';
    const dayjs = require('dayjs');
    let _time = dayjs();
    let oneDayLater = _time.add(1, 'day'); //一天后超时
    export default {
        name: "add",
        data() {
            return {
                info: {
                    title: '',
                    type: '1',
                    maxVote: '',
                    startTime: '',
                    endTime: '',
                    nameList: '',
                },
                startTime: {
                    isShow: false,
                    minDate: _time.toDate(),
                    currentDate: _time.toDate(),
                },
                endTime: {
                    isShow: false,
                    minDate: _time.toDate(),
                    currentDate: oneDayLater.toDate(),
                }
            }
        },
        created(){
            this.info.startTime = _time.format('YYYY-MM-DD HH:mm');
            this.info.endTime = oneDayLater.format('YYYY-MM-DD HH:mm');
        },
        watch:{
            'info.nameList':function(){
                if (this.info.nameList.indexOf('，') >= 0){
                    this.info.nameList = this.info.nameList.replace('，',',');
                }
            }
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
}
</style>