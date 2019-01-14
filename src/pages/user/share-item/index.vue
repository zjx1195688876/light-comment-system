<template>
    <div class="container">
        <light-header
            :userName="pageData.userInfo.userName"
        ></light-header>
        <light-card
            :extend-style="'padding: 20px; margin: 20px auto; width: 1180px;'"
        >
            <h1 class="title">{{ pageData.shareData.title }}</h1>
            <p class="total">总体平均分： {{ pageData.shareData.totalAverage}}</p>
            <p class="item">
                    <span class="item-desc">1. 总体来说，我认为课程符合我的期望。</span>
                    <span class="item-average">(平均分：{{ pageData.shareData.comment1.average }})</span>
            </p>
            <p class="item">
                    <span class="item-desc">2. 课程教材（如PPT、道具）上的知识点逻辑清晰、内容详实。</span>
                    <span class="item-average">(平均分：{{ pageData.shareData.comment2.average }})</span>
            </p>
            <p class="item">
                    <span class="item-desc">3. 课程中使用的案例能帮助我理解课程内容。</span>
                    <span class="item-average">(平均分：{{ pageData.shareData.comment3.average }})</span>
            </p>
            <p class="item">
                    <span class="item-desc">4. 课程内容对我的工作确实有帮助，能直接应用到我的实际工作中。</span>
                    <span class="item-average">(平均分：{{ pageData.shareData.comment4.average }})</span>
            </p>
            <p class="item">
                    <span class="item-desc">5. 讲师在此领域有丰富的相关专业知识与背景。</span>
                    <span class="item-average">(平均分：{{ pageData.shareData.comment5.average }})</span>
            </p>
            <p class="item">
                    <span class="item-desc">6. 您觉得此次分享最有收获，最有用的知识点或案例是哪些？</span>
                    <span
                        class="advantage-item"
                        v-for="(advantage ,index) in pageData.shareData.advantageList"
                        :key="index"
                    >
                        - {{ advantage }}
                    </span>
            </p>
            <p class="item">
                    <span class="item-desc">7. 您觉得此次分享还有哪些可以改进的地方？</span>
                    <span
                        class="improvement-item"
                        v-for="(improvement ,index) in pageData.shareData.improvementList"
                        :key="index"
                    >
                        - {{ improvement }}
                    </span>
            </p>
            <p class="item">
                    <span class="item-desc">8. 我愿意推荐此分享给其他同事或朋友。（5分表示最同意，0分表示完全不同意）</span>
                    <span class="item-average">(平均分：{{ pageData.shareData.comment8.average }})</span>
            </p>
        </light-card>
    </div>
</template>

<script>
import axios from 'axios';
import shareItemStoreModule from '@/store/modules/share-item';
import titleMixin from '@/mixin/title-mixin';
import Header from '@/components/Header.vue';
import Card from '@/components/Card.vue';

let ApiLock = false;

export default {
    name: 'shareItem',
    mixins: [titleMixin],
    components: {
        'light-card': Card,
        'light-header': Header
    },
    title () {
        return '分享的主题';
    },
    asyncData ({ store, route, config}) {
        store.registerModule('item', shareItemStoreModule)
        return Promise.all([
            store.dispatch('getUserInfo', config),
            store.dispatch('item/getPageData', config)
        ]);
    },
    // 重要信息：当多次访问路由时，
    // 避免在客户端重复注册模块。
    destroyed () {
        this.$store.unregisterModule('item')
    },
    computed: {
        pageData () {
            // console.log('this.$store.state: ', this.$store.state);
            const detailList = this.$store.state.item.pageData.detailList || [];
            const shareInfo = this.$store.state.item.pageData.shareInfo || [];

            const data = {
                totalAverage: '暂无',
                comment1: {
                    total: 0,
                    average: '暂无'
                },
                comment2: {
                    total: 0,
                    average: '暂无'
                },
                comment3: {
                    total: 0,
                    average: '暂无'
                },
                comment4: {
                    total: 0,
                    average: '暂无'
                },
                comment5: {
                    total: 0,
                    average: '暂无'
                },
                advantageList: [],
                improvementList: [],
                comment8: {
                    total: 0,
                    average: '暂无'
                }
            };
            if (detailList.length > 0) {
                const len = detailList.length;
                for (let i = 0; i < len; i++) {
                    data.comment1.total += detailList[i].comment1;
                    data.comment2.total += detailList[i].comment2;
                    data.comment3.total += detailList[i].comment3;
                    data.comment4.total += detailList[i].comment4;
                    data.comment5.total += detailList[i].comment5;
                    data.advantageList.push(detailList[i].advantage);
                    data.improvementList.push(detailList[i].improvement);
                    data.comment8.total += detailList[i].comment8;
                }
                data.comment1.average = parseFloat(data.comment1.total / len).toFixed(2);
                data.comment2.average = parseFloat(data.comment2.total / len).toFixed(2);
                data.comment3.average = parseFloat(data.comment3.total / len).toFixed(2);
                data.comment4.average = parseFloat(data.comment4.total / len).toFixed(2);
                data.comment5.average = parseFloat(data.comment5.total / len).toFixed(2);
                data.comment8.average = parseFloat(data.comment8.total / len).toFixed(2);
                data.totalAverage = parseFloat(
                    (
                        Number(data.comment1.average)
                        + Number(data.comment2.average)
                        + Number(data.comment3.average)
                        + Number(data.comment4.average)
                        + Number(data.comment5.average)
                        + Number(data.comment8.average)
                    ) / 6
                ).toFixed(2);
            }

            return {
                userInfo:  this.$store.state.pageData.userInfo,
                shareData: Object.assign({}, data, shareInfo)
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 20px;
    line-height: 50px;
    margin: 0 0 10px;
    text-align: center;
}
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

