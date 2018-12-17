<template>
    <div>
        <div
            v-if="pageData.hide"
            style="margin: 100px auto; text-align: center;"
        >
            技术分享评价已截止
        </div>
        <light-card
            v-else
            :extend-style="'margin: 30px auto; width: 1180px;'"
        >
            <header>
                <h1>{{ pageData.shareInfo.title }}</h1>
                <span> -- {{ pageData.userInfo.userName }}</span>
            </header>
            <main>
                <div class="comment-item">
                    <p>1. 总体来说，我认为课程符合我的期望。</p>
                    <light-radio-group
                        :radio-name="'comment1'"
                        :radio-list="radioList"
                        @change="onChange"
                    />
                </div>
                <div class="comment-item">
                    <p>2. 课程教材（如PPT、道具）上的知识点逻辑清晰、内容详实。</p>
                    <light-radio-group
                        :radio-name="'comment2'"
                        :radio-list="radioList"
                        @change="onChange"
                    />
                </div>
                <div class="comment-item">
                    <p>3. 课程中使用的案例能帮助我理解课程内容。</p>
                    <light-radio-group
                        :radio-name="'comment3'"
                        :radio-list="radioList"
                        @change="onChange"
                    />
                </div>
                <div class="comment-item">
                    <p>4. 课程内容对我的工作确实有帮助，能直接应用到我的实际工作中。</p>
                    <light-radio-group
                        :radio-name="'comment4'"
                        :radio-list="radioList"
                        @change="onChange"
                    />
                </div>
                <div class="comment-item">
                    <p>5. 讲师在此领域有丰富的相关专业知识与背景。</p>
                    <light-radio-group
                        :radio-name="'comment5'"
                        :radio-list="radioList"
                        @change="onChange"
                    />
                </div>
                <div class="comment-item">
                    <p>6. 您觉得此次分享最有收获，最有用的知识点或案例是哪些？</p>
                    <el-input
                        type="textarea"
                        :rows=4
                        v-model="advantage"
                    ></el-input>
                </div>
                <div class="comment-item">
                    <p>7. 您觉得此次分享还有哪些可以改进的地方？</p>
                    <el-input
                        type="textarea"
                        :rows=4
                        v-model="improvement"
                    ></el-input>
                </div>
                <div class="comment-item">
                    <p>8. 我愿意推荐此分享给其他同事或朋友。（5分表示最同意，0分表示完全不同意）</p>
                    <light-radio-group
                        :radio-name="'comment8'"
                        :radio-list="radioList"
                        @change="onChange"
                    />
                </div>
            </main>
            <footer>
                <el-button
                    type="primary"
                    @click="onSubmit"
                >
                    提 交
                </el-button>
            </footer>
        </light-card>
    </div>
</template>

<script>
import axios from 'axios';
import commentStoreModule from '@/store/modules/comment';
import titleMixin from '@/mixin/title-mixin';
import Card from '@/components/Card.vue';
import RadioGroup from './container/RadioGroup.vue';

let ApiLock = false;

export default {
    name: 'comment',
    mixins: [titleMixin],
    components: {
        'light-card': Card,
        'light-radio-group': RadioGroup
    },
    title () {
        return '分享评价';
    },
    asyncData ({ store, route, config}) {
        store.registerModule('comment', commentStoreModule)
        return store.dispatch('comment/getPageData', config)
    },
    // 重要信息：当多次访问路由时，
    // 避免在客户端重复注册模块。
    destroyed () {
        this.$store.unregisterModule('comment')
    },
    computed: {
        pageData () {
            const data = this.$store.state.comment.pageData;
            data.hide = new Date() > new Date(data.shareInfo.lineDate);
            return data;
        }
    },
    data () {
        return {
            radioList: [
                { _index: 1, name: '1分' },
                { _index: 2, name: '2分' },
                { _index: 3, name: '3分' },
                { _index: 4, name: '4分' },
                { _index: 5, name: '5分' }
            ],
            comment1: 0,
            comment2: 0,
            comment3: 0,
            comment4: 0,
            comment5: 0,
            advantage: '',
            improvement: '',
            comment8: 0,
            userId: '',
            shareId: ''
        };
    },
    // location 需要在客户端钩子函数里做，否则服务端渲染报错
    mounted () {
        this.userId = this.getSearchKey('userId');
        this.shareId = this.getSearchKey('shareId');
    },
    methods: {
        onChange (obj) {
            this[obj.radioName] = obj.label;
        },
        onSubmit () {
            const bool = this.checkSubmitData();
            if (bool && !ApiLock) {
                ApiLock = true;
                axios.post('/detail/create.json', {
                    comment1: this.comment1,
                    comment2: this.comment2,
                    comment3: this.comment3,
                    comment4: this.comment4,
                    comment5: this.comment5,
                    advantage: this.advantage,
                    improvement: this.improvement,
                    comment8: this.comment8,
                    userId: this.userId,
                    shareId: this.shareId
                })
                .then(res => {
                    if (res && res.data && res.data.code === 200) {
                        this.showMessage('提交成功');
                        // location.href="/";
                    } else {
                        this.showMessage('提交失败，请重试', 'warning');
                    }
                    ApiLock = false;
                })
                .catch(err => {
                    this.showMessage('提交失败，请重试', 'warning');
                    ApiLock = false;
                });
            }
        },
        checkSubmitData () {
            let message = '';
            let type = 'warning';
            if (!this.comment1) {
                message = '请选择选项1';
                this.showMessage(message, type);
                return false;
            }
            if (!this.comment2) {
                message = '请选择选项2';
                this.showMessage(message, type);
                return false;
            }
            if (!this.comment3) {
                message = '请选择选项3';
                this.showMessage(message, type);
                return false;
            }
            if (!this.comment4) {
                message = '请选择选项4';
                this.showMessage(message, type);
                return false;
            }
            if (!this.comment5) {
                message = '请选择选项5';
                this.showMessage(message, type);
                return false;
            }
            if (!this.advantage) {
                message = '请填写此次分享的收获';
                this.showMessage(message, type);
                return false;
            }
            if (!this.improvement) {
                message = '请填写此次分享可以改进的地方';
                this.showMessage(message, type);
                return false;
            }
            if (!this.comment8) {
                message = '请选择选项8';
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
        },
        getSearchKey (key = '') {
            if (key) {
                const obj = {};
                const search = location.search.split('?')[1];
                const arr = search.split('&');
                arr.forEach(item => {
                    const key = item.split('=')[0];
                    const value = item.split('=')[1];
                    obj[key] = value;
                });

                return obj[key] || '';
            }
            return '';
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    padding: 20px;
    h1 {
        text-align: center;
        font-size: 20px;
    }
    span {
        display: block;
        margin-right: 20px;
        text-align: right;
        font-size: 14px;
        color: #333;
    }
}
main {
    padding: 30px;
    .comment-item {
        margin-bottom: 34px;
        font-size: 14px;
        color: #333;
        p {
            margin: 10px 0;
        }
    }
}
footer {
    padding: 20px;
    text-align: center;
}
</style>

