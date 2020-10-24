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
          label="First Name"
          placeholder="Your Firstname"
          validation="required"
          autocomplete="off"
        />
        <FormulateInput
          v-model="formData.lastName"
          name="lastname"
          type="text"
          label="Last Name"
          placeholder="Your Lastname"
          validation="required"
          autocomplete="off"
        />
      </div>
      <div class="double-wide">
        <FormulateInput
          v-model="formData.nickName"
          name="nickName"
          type="text"
          label="Nick Name"
          placeholder="Your Nickname"
          validation="required"
          autocomplete="off"
        />
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
      <FormulateInput
        v-model="formData.country"
        name="Country"
        type="select"
        label="Country"
        placeholder="Choose your country"
        validation="required"
        autocomplete="off"
        :options="countries"
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
      <div class="double-wide">
        <vue-recaptcha
          @verify="onVerify"
          :sitekey="this.key"
          :loadRecaptchaScript="true"
          @expired="onCaptchaExpired"
          ref="recaptcha"
        ></vue-recaptcha>
        <FormulateInput
          type="submit"
          label="Sign up"
          :disabled="signupEnable == false"
        />
      </div>
    </FormulateForm>
    <div class="text-center">
      Already have an account?
      <a id="signinlink" href="/Signin">Sign in</a>
    </div>
  </div>
</template>

<script>
import properties from "@/common/properties.js";
import countriesNames from "@/common/countriesNames.js";
import grades from "@/common/grades.js";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "SignupForm",
  components: {
    VueRecaptcha,
  },
  data: () => ({
    formData: {
      role: "USER",
    },
    baseUrl: properties.baseUrl(),
    countries: countriesNames.countries,
    grades: grades.grades,
    key: "6LfE_NoZAAAAAHkMclVflpdbA8UceSVI6ENhRTzu",
    signupEnable: false,
  }),
  methods: {
    onVerify(response) {
      this.signupEnable = true;
      this.user.recaptcha = response;
    },
    onCaptchaExpired: function () {
      this.signupEnable = false;
      this.$refs.recaptcha.reset();
    },
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
#signinlink {
  color: white;
}
</style>
