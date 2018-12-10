import Vue from 'vue';
import Router from 'vue-router';

// 代码分割
const Index = () => import('./pages/Index.vue');
const Detail = () => import('./pages/Detail.vue');
const Comment = () => import('./pages/comment/index.vue');

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: Index },
            { path: '/detail', component: Detail },
            { path: '/comment', component: Comment }
        ]
    })
};
