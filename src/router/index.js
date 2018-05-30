import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "@/utils";

Vue.use(Router)

let _import = file => () => import('@/components/' + file);

const router = new Router({
    routes: [
        { path: '/', redirect: '/vote' },
        {
            path: '/',
            name: 'main',
            component: _import('index'),
            children: [
                {
                    path: 'vote',
                    component: _import('vote'),
                    meta: {
                        title: '投票管理',
                        requiresAuth: true
                    },
                },
                {
                    path: 'vote/edit/:id',
                    component: _import('editVote'),
                    meta: {
                        title: '编辑投票',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting',
                    component: _import('setting'),
                    meta: {
                        title: '设置',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/resetPass',
                    component: _import('resetPass'),
                    meta: {
                        title: '重置密码',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/examine',
                    component: _import('examine'),
                    meta: {
                        title: '审核',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/memberList',
                    component: _import('memberList'),
                    meta: {
                        title: '成员管理',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/add',
                    component: _import('add'),
                    meta: {
                        title: '新增投票',
                        requiresAuth: true
                    },
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: _import('login'),
            meta: {
                title: '管理登录',
            },
        }
    ]
})


router.beforeEach(function (to, from, next) {
    let auth = getToken();
    if (to.meta.requiresAuth && (auth == null || auth == '')) {
        next('/login');
    } else {
        next();
    }
})

export default router;