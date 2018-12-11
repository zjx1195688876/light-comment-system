<template>
    <div class="light-header">
        <span class="header">技术分享评价系统</span>
        <span class="user">你好，{{ userName }}</span>
        <span
            class="logout"
            @click="onLogout"
        >
            退出
        </span>
    </div>
</template>

<script>
export default {
    name: 'LightHeader',
    props: {
        userName: {
            type: String,
            default: '使用者'
        }
    },
    methods: {
        onLogout () {
             console.log('退出登录');
        }
    }
}
</script>

<style lang="scss" scoped>
.light-header {
    position: relative;
    width: 100%;
    height: 50px;
    background-color: #333;
    .header {
        margin: 0 0 0 20px;
        line-height: 50px;
        font-size: 18px;
        color: #fff;
    }
    .user {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 100px;
        padding: 0 20px;
        width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 13px;
        color: #fff;
        text-align: right;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .logout {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 50px;
        line-height: 50px;
        font-size: 13px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background-color: rgba(255, 255, 255, .1);
    }
}
</style>


