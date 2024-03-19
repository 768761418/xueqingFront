import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/global.css'
// import App from './App.vue';
import axios from 'axios'

axios.defaults.baseURL = "http://8.130.66.98/"
Vue.config.productionTip = false
Vue.use(ElementUI,{ size: 'small'});
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
