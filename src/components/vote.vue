<template>
    <div class="vote foot_h">
        <van-tabs v-model="active" sticky>
            <van-tab v-for="title in tabTitle" :title="title">

                <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                >

                    <van-cell-swipe :right-width="65"  v-for="item in list" :on-close="onClose">
                        <van-cell-group>
                            <van-cell title="单元格" :to="{path:'/vote/edit/' + item}" is-link/>
                        </van-cell-group>
                        <span slot="right">删除</span>
                    </van-cell-swipe>
                </van-list>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
    import { Dialog } from 'vant';
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

            onClose(clickPosition, instance){
                switch (clickPosition) {
                    case 'left':
                    case 'cell':
                    case 'outside':
                        instance.close();
                        break;
                    case 'right':
                        Dialog.confirm({
                            message: '确定删除吗？'
                        }).then(() => {
                            instance.close();
                        });
                        break;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.vote{
    .add_vote{
    }
}
</style>