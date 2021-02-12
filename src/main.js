import Vue from "vue";
import App from "./App.vue";
import "sweetalert2/dist/sweetalert2.min.css";
import "./styles/formulate.css";
import VueFormulate from "@braid/vue-formulate";
import VueSweetalert2 from "vue-sweetalert2";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import router from "./router";
import LoadScript from "vue-plugin-load-script";
import actions from "./common/actions.js";

Vue.use(VueFormulate);
Vue.use(LoadScript);
Vue.use(VueMaterial);
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
Vue.config.silent = true;
new Vue({
	router,
	render: (h) => h(App),
	created() {
		let routename = this.$route.name.toLowerCase();
		if (
			routename != "signup" &&
			routename != "signin" &&
			routename != "home" &&
			routename != "welcome" &&
			!actions.checkLoggedIn(this.$router)
		) {
			actions.fireLoggedOut(this.$swal, this.$router);
		} else if (
			routename == "signin" ||
			(routename == "welcome" && actions.checkLoggedIn())
		) {
			router.push("/home");
		}
	},
}).$mount("#app");
