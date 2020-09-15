import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/formulate.css';
import VueFormulate from '@braid/vue-formulate';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import LoadScript from 'vue-plugin-load-script';

Vue.use(LoadScript);
Vue.use(VueMaterial)
Vue.use(VueFormulate);
Vue.use(VueSweetalert2);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')