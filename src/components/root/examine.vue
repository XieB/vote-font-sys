<template>
    <div class="examine foot_h">
        <van-checkbox-group v-model="result">
            <van-cell-group>
                <van-cell v-for="item in list" :title="`复选框 ${item}`" :key="item" class="no_left">
                    <van-checkbox :name="item" />
                </van-cell>
            </van-cell-group>
        </van-checkbox-group>
    </div>
</template>

<script>
    export default {
        name: "examine",
        data() {
            return {
                list: ['a', 'b', 'c'],
                result: []
            };
        }
    }
</script>

<style scoped>

</style>