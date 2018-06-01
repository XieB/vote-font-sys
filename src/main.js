import Vue from 'vue'
import App from './App.vue'
//引入前端框架
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import router from './router'

window.router = router;     //我想在axios封装的代码里用

import MyVerify from './assets/js/MyVerify'
Vue.use(MyVerify);
//标题
import VueWechatTitle from 'vue-wechat-title'

Vue.use(Vant);
Vue.use(VueWechatTitle);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
