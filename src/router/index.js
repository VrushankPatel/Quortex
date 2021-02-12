import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

Vue.use(VueRouter);
const routes = [
	{
		path: "/",
		name: "Signin",
		component: Signin,
	},
	{
		path: "/signup",
		name: "signup",
		component: Signup,
	},
	{
		path: "/home",
		name: "home",
		component: Home,
	},
	{
		path: "/signin",
		name: "Signin",
		component: Signin,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
