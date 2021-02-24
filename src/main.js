// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import store from './store'

// axios.get('/', function() {});
// axios.post('/', function() {});
import App from './App'


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios= axios

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<app/>'
})
