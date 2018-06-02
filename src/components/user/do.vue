<template>
    <div class="vote_do">

        <template>
            <van-panel title="多选" desc="最多选2项" class="title"/>
            <van-checkbox-group v-model="result" :max="2">
                <van-cell-group>
                    <van-cell v-for="item in list" :title="`复选框 ${item}`" :key="item">
                        <van-checkbox :name="item" />
                    </van-cell>
                </van-cell-group>
                <div class="plr10 mt10">
                    <van-button type="primary" size="large" class="button" @click="submit" :loading="submitLoading">提交</van-button>
                </div>
            </van-checkbox-group>
        </template>
        <template>
            <van-panel title="单选" class="title"/>
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell title="单选框1" clickable @click="radio = '1'">
                        <van-radio name="1" />
                    </van-cell>
                    <van-cell title="单选框2" clickable @click="radio = '2'">
                        <van-radio name="2" />
                    </van-cell>
                </van-cell-group>
                <div class="plr10 mt10">
                    <van-button type="primary" size="large" class="button" @click="submit" :loading="submitLoading">提交</van-button>
                </div>
            </van-radio-group>
        </template>


    </div>
</template>

<script>
    export default {
        name: "do",
        data(){
            return {
                list: ['a', 'b', 'c'],
                result: ['a', 'b'],
                radio: '',
                submitLoading: false,
            }
        },
        created(){
            let _id = this.$route.params.id;
        },
        methods:{
            submit(){

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
}
</style>