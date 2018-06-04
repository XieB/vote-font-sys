<template>
    <div class="user_vote">
        <van-tabs v-model="active" sticky>
            <van-tab title="进行中">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                        :offset="80"
                >

                    <van-cell-group>
                        <template v-for="(item,index) in list">
                            <van-cell :title="item.title" :to="{path:'/user/vote/do/' + item.id}" value="未投" is-link v-if="item.type == 2" class="no_left" />
                            <van-cell :title="item.title" :to="{path:'/user/vote/result/' + item.id}" value="已投" is-link v-else class="no_left" />
                        </template>
                    </van-cell-group>

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

                    <van-cell-group>
                        <template v-for="(item,index) in listOver">
                            <van-cell :title="item.title" :to="{path:'/user/vote/result/' + item.id}" value="未投" is-link v-if="item.type == 1" class="no_left" />
                            <van-cell :title="item.title" :to="{path:'/user/vote/result/' + item.id}" value="已投" is-link v-else class="no_left" />
                        </template>

                    </van-cell-group>

                    <van-cell title="我是有底线的" v-show="finishedOver" class="last_line no_left"/>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import { getUserVote } from '@/axios';
    export default {
        name: "vote",
        data(){
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
            }
        },
        created(){
        },
        methods:{
            onLoad() {
                this.loading = true;
                getUserVote('2',this.page).then(res=>{
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
                getUserVote('1',this.pageOver).then(res=>{
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
.user_vote{
    .van-cell-text{

    }
}
</style>