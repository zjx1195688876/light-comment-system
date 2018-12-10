<template>
    <el-radio-group v-model="name">
        <el-radio
            v-for="(item, index) in radioList"
            :key="index"
            :label="index"
        >
        {{ item.name }}
    </el-radio>
    </el-radio-group>
</template>

<script>
export default {
    name: 'LightRadioGroup',
    props: {
        radioName: {
            type: String,
            default: ''
        },
        radioList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            name: this.radioName
        };
    }
}
</script>



