import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Element from 'element-ui';

import 'normalize.css/normalize.css';
import './assets/base.css'

Vue.config.productionTip = false

Vue.use(Element, {size: 'mini'});
Vue.prototype.$confirm = Element.MessageBox.confirm

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
