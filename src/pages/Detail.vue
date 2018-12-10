<template>
    <div>详情页 {{ count }}</div>
</template>

<script>
import titleMixin from '../mixin/title-mixin';

export default {
    mixins: [titleMixin],
    title () {
        return 'Detail'
    },
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