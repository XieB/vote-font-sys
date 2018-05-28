import Vue from 'vue'
import App from './App.vue'
//引入前端框架
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import router from './router'
//标题
import VueWechatTitle from 'vue-wechat-title'
//引入验证
import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate';
Validator.localize('zh',zh);
const VeeValidateConfig = {
    locale: 'zh',
}
Vue.use(VeeValidate, VeeValidateConfig)

Vue.use(Vant);
Vue.use(VueWechatTitle);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
