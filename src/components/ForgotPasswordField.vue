<template>
	<div class="signup-form">
		<FormulateForm
			@submit="forgotPassword"
			class="login-form"
			style="border: none"
		>
			<h2>Quortex</h2>
			<div>
				<u>
					<p style="font-size: 120%; color: grey">Forgot Password</p>
				</u>
			</div>
			<div class="double-wide">
				<FormulateInput
					v-model="formData.email"
					name="email"
					type="email"
					label="Email address"
					placeholder="Email address"
					validation="email"
					autocomplete="off"
				/>
			</div>

			<div style="padding-top: 5%">
				<FormulateInput type="submit" label="Submit" />
			</div>
		</FormulateForm>
		<div class="text-center">
			Continue to
			<a style="color: lightgrey; cursor: pointer" @click="backToSignin()"
				>Signin</a
			>
		</div>
	</div>
</template>

<script>
import constants from "@/common/constants.js";
export default {
	name: "ForgotPasswordField",
	data: () => ({
		formData: {
			email: "",
		},
		baseUrl: constants.baseUrl(),
	}),
	methods: {
		forgotPassword() {
			this.$emit("actionForgotPassword", this.formData);
		},
		backToSignin() {
			this.$emit("toggleWindows");
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../styles/common.css";
.login-form {
	padding: 2em;
	border: 1px solid #b3aeae;
	border-radius: 0.5em;
	height: 300%;
	max-width: 500px;
	box-sizing: border-box;
	max-height: 120%;
}
.form-title {
	margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
	max-width: none;
}
@media (min-width: 420px) {
	.double-wide {
		padding-top: 20px;
		display: flex;
	}
	.double-wide .formulate-input {
		flex-grow: 1;
		width: calc(50% - 0.5em);
	}
	.double-wide .formulate-input:first-child {
		margin-right: 0.5em;
	}
	.double-wide .formulate-input:last-child {
		margin-left: 0.5em;
	}
}
.md-content {
	border-radius: 0.5em;
	background-color: transparent;
	max-height: 900px;
	height: auto;
	overflow: auto;
}
.signup-form .md-scrollbar {
	background-color: transparent;
	max-height: auto;
}
</style>
