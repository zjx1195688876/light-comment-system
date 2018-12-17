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
    name: 'shareCreate',
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
            const bool = this.checkCreateShareData();
            if (bool && !ApiLock) {
                ApiLock = true;
                axios.post('/share/create.json', {
                    title: this.form.title,
                    desc: this.form.desc,
                    lineDate: this.form.time ? this.form.time : this.form.date
                })
                .then(res => {
                    if (res && res.data && res.data.code === 200) {
                        location.href="/";
                    } else {
                        this.showMessage('创建失败，请重试', 'warning');
                    }
                    ApiLock = false;
                })
                .catch(err => {
                    this.showMessage('创建失败，请重试', 'warning');
                    ApiLock = false;
                });
            }
        },
        checkCreateShareData () {
            let message = '';
            let type = 'warning';
            if (!this.form.title) {
                message = '请输入分享主题';
                this.showMessage(message, type);
                return false;
            }
            if (!this.form.desc) {
                message = '请输入分享描述';
                this.showMessage(message, type);
                return false;
            }
            if (!this.form.date) {
                message = '请选择评价截止时间';
                this.showMessage(message, type);
                return false;
            }
            return true;
        },
        showMessage (message ,type = "success") {
            this.$message({
                message,
                type
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.line {
    text-align: center;
}
</style>

