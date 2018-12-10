<template>
    <light-card
        :extend-style="'margin: 30px auto; width: 1180px;'"
    >
        <header>
            <h1>{{ shareName }}</h1>
            <span> -- {{ userName }}</span>
        </header>
        <main>
            <div class="comment-item">
                <p>1. 总的来说，我认为课程符合我的期望。</p>
                <light-radio-group
                    :radio-name="'comment1'"
                    :radio-list="radioList"
                />
            </div>
            <div class="comment-item">
                <p>2. 课程教材（如PPT、道具）上的知识点逻辑清晰、内容详实。</p>
                <light-radio-group
                    :radio-name="'comment2'"
                    :radio-list="radioList"
                />
            </div>
            <div class="comment-item">
                <p>3. 课程中使用的案例能帮助我理解课程内容。</p>
                <light-radio-group
                    :radio-name="'comment3'"
                    :radio-list="radioList"
                />
            </div>
            <div class="comment-item">
                <p>4. 课程内容对我的工作确实有帮助，能直接应用到我的实际工作中。</p>
                <light-radio-group
                    :radio-name="'comment4'"
                    :radio-list="radioList"
                />
            </div>
            <div class="comment-item">
                <p>5. 讲师在此领域有丰富的相关专业知识与背景。</p>
                <light-radio-group
                    :radio-name="'comment5'"
                    :radio-list="radioList"
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
                <p>8. 我愿意推荐此分享给其他同事或朋友。</p>
                <light-radio-group
                    :radio-name="'comment8'"
                    :radio-list="radioList"
                />
            </div>
        </main>
        <footer>
            <el-button type="primary">提 交</el-button>
        </footer>
    </light-card>
</template>

<script>
import titleMixin from '@/mixin/title-mixin';
import Card from '@/components/Card.vue';
import RadioGroup from './container/RadioGroup.vue';

export default {
    mixins: [titleMixin],
    components: {
        'light-card': Card,
        'light-radio-group': RadioGroup
    },
    title () {
        return '分享评价';
    },
    data () {
        return {
            shareName: 'Koa && Egg',
            userName: '张金新(墨影)',
            radioList: [
                { index: 1, name: '1分' },
                { index: 2, name: '2分' },
                { index: 3, name: '3分' },
                { index: 4, name: '4分' },
                { index: 5, name: '5分' }
            ],
            advantage: '',
            improvement: ''
        };
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

