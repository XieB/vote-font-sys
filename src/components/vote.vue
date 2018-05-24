<template>
    <div class="vote foot_h">
        <van-tabs v-model="active" sticky>
            <van-tab v-for="title in tabTitle" :title="title">

                <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                >
                    <van-cell title="单元格" is-link value="详情" v-for="item in list" class="no_left" :to="{path:'/vote/edit/2'}" />
                </van-list>

            </van-tab>
            <van-icon name="add-o" color="#4b0" class="add_vote" @click="addVote"/>
        </van-tabs>

    </div>
</template>

<script>
    //在开始时间之后无法编辑
    export default {
        name: "vote",
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                active: 2,

                tabTitle: [
                    '进行中',
                    '已结束',
                ]
            };
        },

        methods: {
            onLoad() {
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    this.loading = false;

                    if (this.list.length >= 20) {
                        this.finished = true;
                    }
                }, 500);
            },
            addVote(){
                this.$router.push('/vote/add');
            }
        }
    }
</script>

<style lang="less" scoped>
.vote{
    .add_vote{
        font-size: 30px;
        position: fixed;
        top: 50px;
        right: 10px;
        background-color: #fff;
        opacity: 0.8;
        border-radius: 50%;
    }
}
</style>