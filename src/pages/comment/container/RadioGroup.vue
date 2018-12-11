<template>
    <el-radio-group
        v-model="label"
        @change="onChange"
    >
        <el-radio
            v-for="(item, index) in radioList"
            :key="index"
            :label="item._index"
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
            label: 0
        };
    },
    methods: {
        onChange ($event) {
            this.$emit('change', {
                radioName: this.radioName,
                label: $event
            });
        }
    }
}
</script>



