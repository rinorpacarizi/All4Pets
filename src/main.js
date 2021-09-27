import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from "vue-router";
import Routes from './components/routes.js';

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  routes:Routes
})

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
