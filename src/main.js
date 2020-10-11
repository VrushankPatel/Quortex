import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/formulate.css";
import VueFormulate from "@braid/vue-formulate";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import LoadScript from "vue-plugin-load-script";
import actions from "./common/actions.js";

Vue.use(LoadScript);
Vue.use(VueMaterial);
Vue.use(VueFormulate);
Vue.use(VueSweetalert2);
Vue.config.silent = true;
Vue.config.productionTip = false;
new Vue({
	router,
	render: (h) => h(App),
	created() {
		if (
			!actions.checkSignedIn(this.$router) &&
			this.$route.name.toLowerCase() != "signin" &&
			this.$route.name.toLowerCase() != "home" &&
			this.$route.name.toLowerCase() != "welcome"
		) {
			actions.fireLoggedOut(this.$swal, this.$router);
		} else if (
			actions.checkSignedIn() &&
			this.$route.name.toLowerCase() == "signin"
		) {
			router.push("/home");
		}
	},
}).$mount("#app");
