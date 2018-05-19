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
                    path: 'setting',
                    component: _import('setting'),
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
