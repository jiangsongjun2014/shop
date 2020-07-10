import Vue from 'vue'
import App from './App'
import router from './router'

// 使用vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Notify } from 'vant'

Vue.prototype.$Notify = Notify

// 路由拦截
import '@/permission' 

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
