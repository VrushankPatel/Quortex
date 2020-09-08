import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/formulate.css';
import VueFormulate from '@braid/vue-formulate';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueFormulate);
Vue.use(VueSweetalert2);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')