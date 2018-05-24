<template>
    <div class="edit_vote">
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
                        v-show="info.type == 2"
                        required
                />

                <van-field
                        v-model="info.startTime"
                        label="开始时间"
                        icon="clear"
                        placeholder="开始时间，默认当前时间"
                />

                <van-field
                        v-model="info.endTime"
                        label="结束时间"
                        placeholder="结束时间"
                        required
                />

                <van-field
                        v-model="info.nameList"
                        label="名单"
                        type="textarea"
                        placeholder="人员列表，以英文逗号分隔"
                        rows="1"
                        autosize
                        required
                />
            </van-cell-group>
        </van-radio-group>
        <div class="plr10 mt10">
            <van-button type="primary" size="large" class="button">提交</van-button>
            <van-button type="danger" size="large" class="button mt10">删除该投票</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "editVote",
        data() {
            return {
                info: {
                    type: '1',
                    maxVote: '',
                    startTime: '',
                    endTime: '',
                    nameList: '',
                }
            }
        },
        watch:{
            'info.nameList':function(){
                if (this.info.nameList.indexOf('，') >= 0){
                    this.info.nameList = this.info.nameList.replace('，',',');
                }
            }
        }
    }
</script>

<style scoped>

</style>