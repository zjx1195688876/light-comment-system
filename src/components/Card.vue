<template>
    <div
        class="light-card"
        :style="extendStyle"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'LightCard',
    props: {
        extendStyle: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.light-card {
    border-radius: 3px;
    background-color: #fff;
}
</style>


