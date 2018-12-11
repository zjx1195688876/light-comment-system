<template>
    <div class="container">
        <light-header></light-header>
        <light-card
            :extend-style="'padding: 20px; margin: 20px auto; width: 1180px;'"
        >
           <p class="total">总体平均分： {{ totalAverage}}</p>
           <p class="item">
                <span class="item-desc">1. 总体来说，我认为课程符合我的期望。</span>
                <span class="item-average">(平均分：{{ comment1.average }})</span>
           </p>
           <p class="item">
                <span class="item-desc">2. 课程教材（如PPT、道具）上的知识点逻辑清晰、内容详实。</span>
                <span class="item-average">(平均分：{{ comment2.average }})</span>
           </p>
           <p class="item">
                <span class="item-desc">3. 课程中使用的案例能帮助我理解课程内容。</span>
                <span class="item-average">(平均分：{{ comment3.average }})</span>
           </p>
           <p class="item">
                <span class="item-desc">4. 课程内容对我的工作确实有帮助，能直接应用到我的实际工作中。</span>
                <span class="item-average">(平均分：{{ comment4.average }})</span>
           </p>
           <p class="item">
                <span class="item-desc">5. 讲师在此领域有丰富的相关专业知识与背景。</span>
                <span class="item-average">(平均分：{{ comment5.average }})</span>
           </p>
           <p class="item">
                <span class="item-desc">6. 您觉得此次分享最有收获，最有用的知识点或案例是哪些？</span>
                <span
                    class="advantage-item"
                    v-for="(advantage ,index) in advantageList"
                    :key="index"
                >
                    - {{ advantage }}
                </span>
           </p>
           <p class="item">
                <span class="item-desc">7. 您觉得此次分享还有哪些可以改进的地方？</span>
                <span
                    class="improvement-item"
                    v-for="(improvement ,index) in improvementList"
                    :key="index"
                >
                    - {{ improvement }}
                </span>
           </p>
           <p class="item">
                <span class="item-desc">8. 我愿意推荐此分享给其他同事或朋友。（5分表示最同意，0分表示完全不同意）</span>
                <span class="item-average">(平均分：{{ comment8.average }})</span>
           </p>
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
        return '分享的主题';
    },
    data () {
        return {
            totalAverage: 4.70,
            comment1: {
                average: 4.71
            },
            comment2: {
                average: 4.71
            },
            comment3: {
                average: 4.71
            },
            comment4: {
                average: 4.71
            },
            comment5: {
                average: 4.71
            },
            advantageList: [
                '优点1优点1优点1优点1优点1',
                '优点1优点1优点1优点1',
                '优点1优点1优点1优点1优点1优点1优点1优点1优点1优点1优点1',
                '优点1优点1优点1优点1优点1优点1优点1优点1优点1优点1'
            ],
            improvementList: [
                '可改进的点1可改进的点1可改进的点1可改进的点1可改进的点1',
                '可改进的点1可改进的点1可改进的点1可改进的点1',
                '可改进的点1可改进的点1可改进的点1',
            ],
            comment8: {
                average: 4.71
            }
        };
    }
}
</script>

<style lang="scss" scoped>
.total {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 10px;
}
.item {
    line-height: 50px;
    font-size: 13px;
    color: #555;
    .item-average {
        margin-left: 20px;
        color: #da1717;
    }
    .advantage-item, .improvement-item {
        margin-left: 20px;
        display: block;
        line-height: 34px;
        color: #666;
    }
}
</style>

