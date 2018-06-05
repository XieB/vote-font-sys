<template>
    <div class="vote foot_h">
        <van-tabs v-model="active" sticky>
            <van-tab title="未结束">

                <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                        :offset="80"
                >

                    <van-cell-swipe :right-width="65"  v-for="(item,index) in list" :on-close="onClose(item.id,index)">
                        <van-cell-group>
                            <van-cell :title="item.title" :to="{path:'/m_root/vote/edit/' + item.id}" value="单选" is-link v-if="item.type == 1" />
                            <van-cell :title="item.title" :to="{path:'/m_root/vote/edit/' + item.id}" value="多选" is-link v-else />
                        </van-cell-group>
                        <span slot="right">删除</span>
                    </van-cell-swipe>

                    <van-cell title="我是有底线的" v-show="finished" class="last_line no_left"/>
                </van-list>
            </van-tab>

            <van-tab title="已结束">

                <van-list
                        v-model="loadingOver"
                        :finished="finishedOver"
                        @load="onLoadOver"
                        :offset="80"
                >

                    <van-cell-swipe :right-width="65"  v-for="(item,index) in listOver" :on-close="onCloseOver(item.id,index)">
                        <van-cell-group>
                            <van-cell :title="item.title" :to="{path:'/m_root/vote/edit/' + item.id}" value="单选" is-link v-if="item.type == 1" />
                            <van-cell :title="item.title" :to="{path:'/m_root/vote/edit/' + item.id}" value="多选" is-link v-else />
                        </van-cell-group>
                        <span slot="right">删除</span>
                    </van-cell-swipe>

                    <van-cell title="我是有底线的" v-show="finishedOver" class="last_line no_left"/>
                </van-list>

            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import { getVote, deleteVote } from '@/axios';
    //在开始时间之后无法编辑
    export default {
        name: "vote",
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                active: 2,
                page: '1',  //页码

                loadingOver: false,
                finishedOver: false,
                pageOver: '1',
                listOver: [],
            };
        },

        methods: {
            onLoad() {
                this.loading = true;
                getVote('2',this.page).then(res=>{
                    if (res.data.status){
                        this.list.push(...res.data.data);
                        this.page++;
                    }else{
                        this.finished = true;
                    }
                    this.loading = false;
                })
            },
            onLoadOver(){
                this.loadingOver = true;
                getVote('1',this.pageOver).then(res=>{
                    if (res.data.status){
                        this.listOver.push(...res.data.data);
                        this.pageOver++;
                    }else{
                        this.finishedOver = true;
                    }
                    this.loadingOver = false;
                })
            },

            onClose(id,index){
                return (clickPosition, instance) => {
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
                                deleteVote(id).then(res=>{
                                    if (res.data.status){
                                        this.list.splice(index,1);
                                    }
                                })

                            });
                            break;
                    }
                }
            },
            onCloseOver(id,index){
                return (clickPosition, instance) => {
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
                                deleteVote(id).then(res=>{
                                    if (res.data.status){
                                        this.listOver.splice(index,1);
                                    }
                                })

                            });
                            break;
                    }
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