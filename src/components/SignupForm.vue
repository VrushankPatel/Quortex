<template>
	<div class="signup-form">
		<FormulateForm @submit="signUp" class="login-form">
			<h2>Questa</h2>
			<p class="hint-text">
				Create your account. It's free and only takes a minute.
			</p>
			<div class="double-wide">
				<FormulateInput
					v-model="formData.firstName"
					name="firstname"
					type="text"
					label="firstname"
					placeholder="Your Firstname"
					validation="required"
					autocomplete="off"
				/>
				<FormulateInput
					v-model="formData.lastName"
					name="lastname"
					type="text"
					label="lastname"
					placeholder="Your Lastname"
					validation="required"
					autocomplete="off"
				/>
			</div>
			<FormulateInput
				v-model="formData.email"
				name="email"
				type="email"
				label="Email address"
				placeholder="Email address"
				validation="email"
				autocomplete="off"
			/>
			<FormulateInput
				v-model="formData.birthdate"
				type="date"
				name="DOB"
				label="Date of birth"
				placeholder="Date of birth"
				validation="required"
				autocomplete="off"
			/>
			<!-- validation="required|after:2019-01-01"
        min="2018-12-01"
      max="2021-01-01"-->
			<FormulateInput
				v-model="formData.grade"
				name="Grade"
				type="number"
				label="Grade"
				placeholder="Grade"
				validation="required|min:1"
				autocomplete="off"
			/>
			<FormulateInput
				v-model="formData.school"
				name="School"
				type="text"
				label="School"
				placeholder="School"
				validation="required"
			/>
			<FormulateInput
				v-model="formData.country"
				name="Country"
				type="text"
				label="Country"
				placeholder="Country"
				validation="required"
			/>
			<div class="double-wide">
				<FormulateInput
					id="pwdfield"
					name="password"
					type="password"
					label="Password"
					placeholder="Your password"
					validation="required"
				/>
				<!-- below line was for testing in password field -->
				<!-- v-model="formData.password" -->
				<FormulateInput
					name="password_confirm"
					type="password"
					label="Confirm your password"
					placeholder="Confirm password"
					validation="confirm"
					validation-name="Confirmation"
				/>
			</div>
			<FormulateInput type="submit" label="Sign up" />
		</FormulateForm>
		<div class="text-center">
			Already have an account?
			<a href="/Signin">Sign in</a>
		</div>
	</div>
</template>

<script>
import properties from "@/common/properties.js";

export default {
	name: "SignupForm",
	data: () => ({
		formData: {
			role: "USER",
		},
		baseUrl: properties.baseUrl(),
	}),
	methods: {
		signUp() {
			let pwdRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
			let password = document.getElementById("pwdfield").value;
			if (!pwdRegEx.test(password)) {
				this.$swal.fire({
					icon: "error",
					title: "Oops..",
					text:
						"Password should be of eight characters and must contain one uppercase, one lowercase, one number and one special character.",
				});
				return;
			}

			this.formData["password"] = password;
			// console.log(this.formData);
			this.$emit("actionSignUp", this.formData, this.$swal, this.$router);
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
	max-width: 500px;
	box-sizing: border-box;
}
.form-title {
	margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
	max-width: none;
}
@media (min-width: 420px) {
	.double-wide {
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
</style>
