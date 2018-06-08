<template>
    <div class="member_list foot_h">
        <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :offset="80"
        >

            <van-cell-swipe :right-width="65"  v-for="(item,index) in list"  :on-close="onClose(item.id,index)">
                <van-cell-group>
                    <van-cell :title="`${item.realName}`" :to="{name: 'adminUserInfo',params: {id: item.id}}" is-link />
                </van-cell-group>
                <span slot="right">删除</span>
            </van-cell-swipe>

            <van-cell title="我是有底线的" v-show="finished" class="last_line no_left"/>
        </van-list>
    </div>
</template>

<script>
    import {getExamine,deleteMember} from '@/axios';
    import {Toast,Dialog} from 'vant';
    export default {
        name: "memberList",
        data(){
            return {
                loading: false,
                finished: false,
                list: [],
                page: 1,
            }
        },
        created(){

        },
        methods:{
            onLoad() {
                this.loading = true;
                getExamine(this.page).then(res=>{
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
                        case 'cell':
                        case 'outside':
                            instance.close();
                            break;
                        case 'right':
                            Dialog.confirm({
                                message: '确定删除吗？'
                            }).then(() => {
                                deleteMember(id).then(res=>{
                                    if (res.data.status){
                                        this.list.splice(index,1);
                                    }else{
                                        Toast('删除失败');
                                    }
                                })

                            });
                            break;
                    }
                }
            },
        }
    }
</script>

<style lang="less" scoped>
.member_list{
    .van-cell__right-icon{
        color: #f44;
        font-size: 14px;
    }
}
</style>