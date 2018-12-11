<template>
    <el-card class="item">
        <div slot="header" class="clearfix">
            <span class="title">{{ item.title }}</span>
            <el-button 
                style="float: right; padding: 2px 0" type="text"
                @click="onWatch(item)"
            >
                查看
            </el-button>
        </div>
        <div class="desc">
            {{ item.desc }}
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
    methods: {
       onWatch (item) {
           console.log(item);
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
        max-width: 250px;
        font-size: 14px;
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
}
.clearfix:before, .clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>


