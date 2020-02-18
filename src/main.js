
import 'bootstrap/dist/css/bootstrap.min.css'


import $ from 'jquery'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/js/bootstrap.min.js'



Vue.use(ElementUI, {size: 'small'});

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})