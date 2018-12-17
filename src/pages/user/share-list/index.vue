<template>
    <div class="container">
        <light-header
            :userName="pageData.userInfo.userName"
        ></light-header>
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
                v-for="(item, index) in pageData.shareList"
                :key="index"
                :item="item"
                :_index="index"
            ></item>
        </light-card>
    </div>
</template>

<script>
import axios from 'axios';
import shareListStoreModule from '@/store/modules/share-list';
import titleMixin from '@/mixin/title-mixin';
import Header from '@/components/Header.vue';
import Card from '@/components/Card.vue';
import Item from './components/Item.vue';

let ApiLock = false;

export default {
    name: 'shareList',
    mixins: [titleMixin],
    components: {
        'light-card': Card,
        'light-header': Header,
        'item': Item
    },
    title () {
        return '个人分享列表';
    },
    asyncData ({ store, route, config}) {
        store.registerModule('list', shareListStoreModule)
        return store.dispatch('list/getPageData', config)
    },
    // 重要信息：当多次访问路由时，
    // 避免在客户端重复注册模块。
    destroyed () {
        this.$store.unregisterModule('list')
    },
    computed: {
        pageData () {
            // console.log('pageData: ' ,this.$store.state.list.pageData);
            return this.$store.state.list.pageData
        }
    },
    methods: {
        onCreate () {
            location.href = '/share-create';
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

