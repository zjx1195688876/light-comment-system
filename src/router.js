import Vue from 'vue';
import Router from 'vue-router';

// 代码分割
const Index = () => import('./pages/Index.vue');
const Detail = () => import('./pages/Detail.vue');
const Comment = () => import('./pages/comment/index.vue');
const Login = () => import('./pages/user/login/index.vue');
const ShareList = () => import('./pages/user/share-list/index.vue');
const ShareItem = () => import('./pages/user/share-item/index.vue');
const ShareCreate = () => import('./pages/user/share-create/index.vue');

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: Index },
            { path: '/detail', component: Detail },
            { path: '/comment', component: Comment },
            { path: '/login', component: Login },
            { path: '/share-list', component: ShareList },
            { path: '/share-item', component: ShareItem },
            { path: '/share-create', component: ShareCreate }
        ]
    })
};
