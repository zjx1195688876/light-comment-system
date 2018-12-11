<template>
    <div class="container">
        <light-header></light-header>
        <div class="create-box">
            <el-button
                type="primary"
                @click="onCreate"
            >
                创建分享
            </el-button>
        </div>
        <light-card
            class="list clearfix"
            :extend-style="'margin: 20px auto; width: 1180px;'"
        >
            <item
                v-for="(item, index) in list"
                :key="index"
                :item="item"
                :_index="index"
            ></item>
        </light-card>
    </div>
</template>

<script>
import axios from 'axios';
import titleMixin from '@/mixin/title-mixin';
import Header from '@/components/Header.vue';
import Card from '@/components/Card.vue';
import Item from './components/Item.vue';

let ApiLock = false;

export default {
    mixins: [titleMixin],
    components: {
        'light-card': Card,
        'light-header': Header,
        'item': Item
    },
    title () {
        return '个人分享列表';
    },
    data () {
        return {
            list: [
                { title: '分享分享1分享1分享1分享11', desc: '分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述', shareId: 1 },
                { title: '分享1分享1分享1分享1分享1', desc: '分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述',shareId: 2 },
                { title: '分享1分享1分享1分享1', desc: '分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述', shareId: 3 },
                { title: '分享1分享1分享1分享1分享1分享1分享1分享1', desc: '分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述', shareId: 4 },
                { title: '分享1分享1分享1分享1', desc: '分享描述分享描述分享描述分享描述分享描述分享描述分享描述分享描述', shareId: 5 },
            ]
        }
    },
    methods: {
        onCreate () {
            console.log('创建分享');
        }
    }
}
</script>

<style lang="scss" scoped>
.create-box {
    margin: 20px auto;
    width: 1180px;
}
.list {
    padding: 20px;
}
.clearfix:before, .clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>

