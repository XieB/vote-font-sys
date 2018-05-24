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
                    component: _import('vote')
                },
                {
                    path: 'vote/add',
                    component: _import('add')
                },
                {
                    path: 'vote/edit/:id',
                    component: _import('editVote')
                },
                {
                    path: 'setting',
                    component: _import('setting'),
                },
                {
                    path: 'setting/resetPass',
                    component: _import('resetPass'),
                },
                {
                    path: 'setting/examine',
                    component: _import('examine'),
                },
                {
                    path: 'setting/memberList',
                    component: _import('memberList'),
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: _import('login'),
        }
    ]
})
