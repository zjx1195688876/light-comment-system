<template>
    <el-card class="item">
        <div slot="header" class="clearfix">
            <span class="title">{{ item.title }}</span>
        </div>
        <div class="desc">
            {{ item.desc }}
        </div>
        <div class="btn-box">
            <el-button
                type="primary"
                size="mini"
                @click="onWatch(item)"
            >
                查看
            </el-button>
            <el-button
                size="mini"
                @click="onShare(item)"
            >
                分享
            </el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'Item',
    props: {
        _index: {
            type: [Number, String],
            default: 0
        },
        item: {
            type: Object,
            default: {}
        }
    },
    serverCacheKey: props => props.item.shareId,
    methods: {
        onWatch (item) {
            location.href = `/share-item?shareId=${item.shareId}`;
        },
        onShare (item) {
            location.href = `/comment?userId=${item.userId}&shareId=${item.shareId}`;
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    display: block;
    float: left;
    margin: 1.6%;
    width: 30%;
    .title {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        line-height: 1;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .desc {
        line-height: 20px;
        font-size: 13px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .btn-box {
        margin: 30px 0 0;
        text-align: right;
    }
}
.clearfix:before, .clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>


