import Vue from 'vue'
import App from './App.vue'

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import router from './router'
import VueWechatTitle from 'vue-wechat-title'

Vue.use(Vant);
Vue.use(VueWechatTitle);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
