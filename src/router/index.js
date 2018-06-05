import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "@/utils";
import {getCodeUrl} from "@/config";

Vue.use(Router)

// let _import = file => () => import('@/components/' + file);

let _importAdmin = file => () => import('@/components/root/' + file);
let _importUser = file => () => import('@/components/user/' + file);

const router = new Router({
    routes: [
        { path: '/m_root', redirect: '/m_root/vote' },
        {
            path: '/m_root',
            name: 'main',
            component: _importAdmin('index'),
            children: [
                {
                    path: 'vote',
                    component: _importAdmin('vote'),
                    meta: {
                        title: '投票管理',
                        requiresAuth: true
                    },
                },
                {
                    path: 'vote/edit/:id',
                    component: _importAdmin('editVote'),
                    meta: {
                        title: '编辑投票',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting',
                    component: _importAdmin('setting'),
                    meta: {
                        title: '设置',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/resetPass',
                    component: _importAdmin('resetPass'),
                    meta: {
                        title: '重置密码',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/examine',
                    component: _importAdmin('examine'),
                    meta: {
                        title: '审核',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/memberList',
                    component: _importAdmin('memberList'),
                    meta: {
                        title: '成员管理',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/add',
                    component: _importAdmin('add'),
                    meta: {
                        title: '新增投票',
                        requiresAuth: true
                    },
                },
            ]
        },

        { path: '/user', redirect: '/user/vote' },
        {
            path: '/user',
            name: 'user',
            component: _importUser('user'),
            children: [
                {
                    path: 'vote',
                    component: _importUser('vote'),
                    meta: {
                        title: '投票',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting',
                    component: _importUser('setting'),
                    meta: {
                        title: '设置',
                        requiresAuth: true
                    },
                },
                {
                    path: 'setting/info',
                    component: _importUser('info'),
                    meta: {
                        title: '修改个人信息',
                        requiresAuth: true
                    },
                },
                {
                    path: 'vote/do/:id',
                    component: _importUser('do'),
                    meta: {
                        title: '投票',
                        requiresAuth: true
                    },
                },
                {
                    path: 'vote/result/:id',
                    component: _importUser('result'),
                    meta: {
                        title: '投票结果',
                        requiresAuth: true
                    },
                },
            ]
        },

        {
            path: '/m_root/login',
            name: 'login',
            component: _importAdmin('login'),
            meta: {
                title: '管理登录',
            },
        },
        {
            path: '/user/login',
            name: 'userLogin',
            component: _importUser('login'),
            meta: {
                title: '用户登录',
            },
        }
    ]
})


router.beforeEach(function (to, from, next) {
    // console.log(getCodeUrl);
    let auth = getToken();
    if (to.meta.requiresAuth && (auth == null || auth == '')) {     //微信打开，如果登录后台后打开前台页面，由于是sessionStorage,所以不存在问题
        if (to.path.indexOf('/user') == 0){    //'/user/'开头为投票用户
            window.location.href = getCodeUrl;
            next(false);
        }else if (to.path.indexOf('/m_root/') == 0){ //'/m_root/'开头为后台管理
            next('/m_root/login');
        }
    } else {
        next();
    }
})

export default router;