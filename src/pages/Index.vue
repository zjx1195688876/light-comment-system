<template>
    <div>{{ count }}</div>
</template>

<script>
export default {
    asyncData ({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('inc')
    },
    computed: {
        // 从 store 的 state 对象中的获取 count
        count () {
            return this.$store.state.count
        }
    }
}
</script>