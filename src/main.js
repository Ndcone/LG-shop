import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible';
import Vueresource from 'vue-resource'
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
// 全局引入按需引入UI库 vant
import '@/plugins/vant'

//设置跨域请求
Vue.use(Vueresource)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
