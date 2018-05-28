import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let _import = file => () => import('@/components/' + file);

export default new Router({
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
                    },
                },
                {
                    path: 'vote/add',
                    component: _import('add'),
                    meta: {
                        title: '新增投票',
                    },
                },
                {
                    path: 'vote/edit/:id',
                    component: _import('editVote'),
                    meta: {
                        title: '编辑投票',
                    },
                },
                {
                    path: 'setting',
                    component: _import('setting'),
                    meta: {
                        title: '设置',
                    },
                },
                {
                    path: 'setting/resetPass',
                    component: _import('resetPass'),
                    meta: {
                        title: '重置密码',
                    },
                },
                {
                    path: 'setting/examine',
                    component: _import('examine'),
                    meta: {
                        title: '审核',
                    },
                },
                {
                    path: 'setting/memberList',
                    component: _import('memberList'),
                    meta: {
                        title: '成员管理',
                    },
                }
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
