<template>
    <div class="member_list foot_h">
        <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
        >
            <van-cell title="单元格" class="no_left">
                <van-icon slot="right-icon" name="delete" class="van-cell__right-icon" />
            </van-cell>
        </van-list>
    </div>
</template>

<script>
    export default {
        name: "memberList",
        data(){
            return {
                loading: false,
                finished: false,
            }
        },
        methods:{
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