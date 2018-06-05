<template>
    <div class="examine foot_h">
        <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :offset="80"
        >

            <van-cell-swipe :right-width="65" :left-width="65" v-for="(item,index) in list"  :on-close="onClose(item.id,index)">
                <span slot="left">审核</span>
                <van-cell-group>
                    <van-cell :title="`${item.realName} ${item.mobile}`" />
                </van-cell-group>
                <span slot="right">删除</span>
            </van-cell-swipe>

            <van-cell title="我是有底线的" v-show="finished" class="last_line no_left"/>
        </van-list>
    </div>
</template>

<script>
    import {getNoExamine,examineUser,deleteMember} from "@/axios";
    import {Dialog,Toast} from 'vant';

    export default {
        name: "examine",
        data() {
            return {
                list: [],
                result: [],
                loading: false,
                finished: false,
                page: '1',
            };
        },
        methods:{
            onLoad() {
                this.loading = true;
                getNoExamine(this.page).then(res=>{
                    if (res.data.status){
                        this.list.push(...res.data.data);
                        this.page++;
                    }else{
                        this.finished = true;
                    }
                    this.loading = false;
                })
            },
            onClose(id,index){
                return (clickPosition, instance) => {
                    switch (clickPosition) {
                        case 'left':
                            Dialog.confirm({
                                message: '确定审核通过吗？'
                            }).then(() => {
                                examineUser(id).then(res=>{
                                    if (res.data.status){
                                        this.list.splice(index,1);
                                    }else{
                                        Toast('操作失败');
                                    }
                                })

                            });
                            break;
                        case 'cell':
                        case 'outside':
                            instance.close();
                            break;
                        case 'right':
                            Dialog.confirm({
                                message: '确定删除吗？'
                            }).then(()=>{
                                deleteMember(id).then(res=>{
                                    if (res.data.status){
                                        this.list.splice(index,1);
                                    }else{
                                        Toast('删除失败');
                                    }
                                })
                            })
                            break;
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>