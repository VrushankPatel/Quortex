<template>
	<div class="home">
		<SignupForm v-on:actionSignUp="signUp" />
		<Loader v-if="showLoader" />
	</div>
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";
import axios from "axios";
import properties from "@/common/properties.js";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import Loader from "@/components/Loader.vue";

export default {
	name: "Signup",
	beforeMount() {
		document.body.style.backgroundColor = "rgb(99,115,138)";
	},
	components: {
		SignupForm,
		Loader,
	},
	data: () => ({
		baseUrl: properties.baseUrl(),
		showLoader: false,
	}),
	methods: {
		async signUp(formData, swal, router) {
			this.showLoader = true;
			formData = utilities.trimFormData(formData);
			var data = JSON.stringify(formData);
			var config = {
				method: "post",
				url: this.baseUrl + "/signup",
				headers: utilities.getPlainJSONHeader(),
				data: data,
			};
			axios(config)
				.then((response) => {
					this.showLoader = false;
					actions.actionSignup(
						swal,
						response.data.code,
						response.data.status,
						router
					);
				})
				.catch((error) => {
					console.log(JSON.stringify(error));
					this.showLoader = false;
					actions.actionSignup(
						swal,
						error.response.data.code,
						error.response.data.status,
						router
					);
				});
		},
	},
};
</script>
