import Vue from 'vue';
import Router from 'vue-router';
import _ from './utils';

// 代码分割
const Index = () => import('./pages/Index.vue');
const Detail = () => import('./pages/Detail.vue');
const Comment = () => import('./pages/comment/index.vue');
const Login = () => import('./pages/user/login/index.vue');
const ShareList = () => import('./pages/user/share-list/index.vue');
const ShareItem = () => import('./pages/user/share-item/index.vue');
const ShareCreate = () => import('./pages/user/share-create/index.vue');

const routes = [
    {
        path: '/',
        component: ShareList,
        meta: {
            requireAuth: true
        }
    },
    { 
        path: '/detail', 
        component: Detail
    },
    { 
        path: '/comment',
        component: Comment 
    },
    { 
        path: '/login', 
        component: Login
    },
    // { path: '/share-list', component: ShareList },
    { 
        path: '/share-item', 
        component: ShareItem,
        meta: {
            requireAuth: true
        }
    },
    { 
        path: '/share-create', 
        component: ShareCreate,
        meta: {
            requireAuth: true
        }
    }
];

Vue.use(Router);

export function createRouter (cookie) {
    const router = new Router({
        mode: 'history',
        routes
    });

    router.beforeEach((to, from, next) => {
        if (to.meta.requireAuth) {
            if (_.getCookie(cookie, 'user')) {
                next();
            } else {
                next({
                    path: '/login'
                });
            }
        } else {
            next();
        }
    });

    return router;
};
