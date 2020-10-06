<template>
	<div class="signup-form">
		<Loader v-if="showLoader" />
		<FormulateForm @submit="editProfile" class="login-form">
			<h2>Questa</h2>
			<!-- <p>{{ formData }}</p> -->
			<center>
				<u>
					<p style="font-size: 120%; color: grey">Edit Profile</p>
				</u>
			</center>
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
					id="lastname"
					v-model="formData.lastName"
					name="lastname"
					type="text"
					label="lastname"
					placeholder="Your Lastname"
					validation="required"
					autocomplete="off"
				/>
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
				<FormulateInput
					v-model="formData.birthdate"
					type="date"
					name="DOB"
					label="Date of birth"
					placeholder="Date of birth"
					validation="required"
					autocomplete="off"
				/>
			</div>
			<!-- validation="required|after:2019-01-01"
        min="2018-12-01"
      max="2021-01-01"-->
			<div class="double-wide">
				<FormulateInput
					v-model="formData.grade"
					name="Grade"
					type="select"
					label="Grade"
					placeholder="Grade"
					validation="required"
					autocomplete="off"
					:options="grades"
				/>
				<FormulateInput
					v-model="formData.school"
					name="School"
					type="text"
					label="School"
					placeholder="School"
					validation="required"
				/>
			</div>
			<FormulateInput
				v-model="formData.country"
				name="Country"
				type="text"
				label="Country"
				placeholder="Country"
				validation="required"
			/>
			<div class="double-wide" v-if="changePassword">
				<FormulateInput
					name="password"
					id="passwordConf"
					type="password"
					label="Password"
					placeholder="Your password"
					validation
				/>
				<FormulateInput
					name="password_confirm"
					type="password"
					label="Confirm your password"
					placeholder="Confirm password"
					validation="confirm"
					validation-name="Confirmation"
				/>
			</div>
			<div class="double-wide">
				<FormulateInput
					v-if="toggler"
					type="button"
					@click="togglePasswordFields()"
					label="Change your password"
				/>
				<FormulateInput
					v-else
					type="button"
					@click="togglePasswordFields()"
					label="Keep password as it is"
				/>
				<div>
					<FormulateInput type="submit" label="Apply" />
				</div>
			</div>
			<div
				class="restoredefault"
				title="Restore Defaults"
				@click="restoreFormDefaults()"
			>
				<md-icon>restore</md-icon>
			</div>
		</FormulateForm>
	</div>
</template>

<script>
import properties from "@/common/properties.js";
import axios from "axios";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import grades from "@/common/grades.js";
import Loader from "@/components/Loader.vue";
export default {
	name: "EditProfileField",
	components: {
		Loader,
	},
	data: () => ({
		formData: {
			firstName: "",
			lastName: "",
			email: "",
			birthdate: "",
			grade: "",
			school: "",
			country: "",
		},
		grades: grades.grades,
		showLoader: true,
		changePassword: false,
		baseUrl: properties.baseUrl(),
		toggler: true,
		defaults: {},
	}),
	beforeMount() {
		this.getUserData();
	},

	methods: {
		restoreFormDefaults() {
			this.formData["firstName"] = this.defaults.firstName;
			this.formData["lastName"] = this.defaults.lastName;
			this.formData["email"] = this.defaults.email;
			this.formData["birthdate"] = this.defaults.birthdate;
			this.formData["grade"] = this.defaults.grade;
			this.formData["school"] = this.defaults.school;
			this.formData["country"] = this.defaults.country;
		},
		editProfile() {
			if (this.changePassword == true) {
				const password = document.getElementById("passwordConf").value;
				let pwdRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
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
			}
			alert(
				"edit profile" + JSON.stringify(this.formData) + this.changePassword
			);
		},
		togglePasswordFields() {
			delete this.formData["password"];
			this.changePassword = !this.changePassword;
			this.toggler = !this.toggler;
		},
		getUserData() {
			var config = {
				method: "post",
				url:
					properties.baseUrl() +
					"/getuser/" +
					utilities.getUserId(this.$router),
				headers: utilities.getAuthJSONHeader(),
			};

			axios(config)
				.then((response) => {
					this.showLoader = false;
					this.defaults = response.data;
					this.restoreFormDefaults();
				})
				.catch((error) => {
					console.log(error);
					this.showLoader = false;
					actions.fireLoggedOut(this.$swal, this.$router);
				});
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
.restoredefault {
	cursor: pointer;
}
</style>
