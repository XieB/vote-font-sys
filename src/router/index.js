import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let _import = file => () => import('@/components/' + file);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: _import('index'),
            children: [
                {
                    path: 'index',
                    component: _import('Index')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: _import('login'),
        }
    ]
})
