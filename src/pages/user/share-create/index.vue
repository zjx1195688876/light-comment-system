<template>
    <div class="container">
        <light-header></light-header>
        <light-card
            :extend-style="'padding: 20px; margin: 20px auto; width: 980px;'"
        >
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="分享主题">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="分享描述">
                    <el-input type="textarea" v-model="form.desc" :rows=5 />
                </el-form-item>
                <el-form-item label="评价截止时间">
                    <el-col :span="11">
                        <el-date-picker
                            type="date" 
                            placeholder="选择日期" 
                            v-model="form.date" 
                            style="width: 100%;"
                        />
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker
                            type="fixed-time"
                            placeholder="选择时间"
                            v-model="form.time"
                            style="width: 100%;" 
                        />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                </el-form-item>
            </el-form>
        </light-card>
    </div>
</template>

<script>
import axios from 'axios';
import titleMixin from '@/mixin/title-mixin';
import Header from '@/components/Header.vue';
import Card from '@/components/Card.vue';

let ApiLock = false;

export default {
    mixins: [titleMixin],
    components: {
        'light-card': Card,
        'light-header': Header
    },
    title () {
        return '创建分享';
    },
    data () {
        return {
            form: {
                title: '',
                desc: '',
                date: '',
                time: ''
            }
        };
    },
    methods: {
        onSubmit () {
            console.log('创建分享');
        }
    }
}
</script>

<style lang="scss" scoped>
.line {
    text-align: center;
}
</style>

