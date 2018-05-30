<template>
    <div class="add_vote">

        <van-radio-group v-model="info.type" class="group">
            <van-cell-group>
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
                        v-model="formatStartTime"
                        label="开始时间"
                        placeholder="开始时间，默认当前时间"
                        @click="showStartTimeSelect"
                        readonly
                />

                <van-field
                        v-model="formatEndTime"
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
            />
        </transition>
    </div>
</template>

<script>
    const dayjs = require('dayjs');
    export default {
        name: "add",
        data() {
            return {
                info: {
                    type: '1',
                    maxVote: '',
                    startTime: 0,
                    endTime: 0,
                    nameList: '',
                },
                startTime: {
                    isShow: false,
                    minDate: new Date(),
                    currentDate: new Date()
                },
                endTime: {
                    isShow: false,
                    minDate: new Date(),
                    currentDate: new Date()
                }
            }
        },
        created(){
            let _time = dayjs();
            this.info.startTime = _time.unix();
            this.info.endTime = _time.add(1, 'day').unix();   //默认一天后超时
        },
        watch:{
            'info.nameList':function(){
                if (this.info.nameList.indexOf('，') >= 0){
                    this.info.nameList = this.info.nameList.replace('，',',');
                }
            }
        },
        computed:{
            formatStartTime: function(){
                if (this.info.startTime){
                    return dayjs(this.info.startTime * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            formatEndTime: function(){
                if (this.info.endTime){
                    return dayjs(this.info.endTime * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        },
        methods:{
            submitStartTime(value){
                this.info.startTime = dayjs(value).unix();
                this.startTime.isShow = false;
            },
            submitEndTime(value){
                this.info.endTime = dayjs(value).unix();
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
                    console.log(res);
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