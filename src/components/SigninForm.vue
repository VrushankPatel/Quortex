<template>
  <div class="signup-form">
    <FormulateForm @submit="handleSubmit" class="login-form">
      <h2>Questa</h2>
      <div class="single-wide">
        <FormulateInput
          v-model="formValues.username"
          name="email"
          type="email"
          label="Email address"
          placeholder="Email address"
          validation="email"
        />
        <!-- below line was for testing in password field -->
        <!-- v-model="formValues.password" -->
        <FormulateInput
          id="pwdfield"
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          validation="required"
        />
      </div>
      <FormulateInput class="submit" type="submit" label="Signin" />
    </FormulateForm>
    <div class="text-center">
      Don't have an account?
      <a style="color: lightgrey; cursor: pointer" href="/Signup">Sign up</a>
    </div>
    <div class="text-center">
      <a style="color: lightgrey; cursor: pointer" @click="showForgotPasswrd()"
        >Forgot Password</a
      >
    </div>
  </div>
</template>

<script>
import properties from "@/common/properties.js";
export default {
  name: "SigninForm",
  data: () => ({
    formValues: {},
    baseUrl: properties.baseUrl(),
    showForgotDialog: false,
  }),
  methods: {
    handleSubmit() {
      this.formValues["password"] = document.getElementById("pwdfield").value;
      this.$emit("actionSignIn", this.formValues, this.$swal, this.$router);
    },
    showForgotPasswrd() {
      this.$emit("toggleWindows");
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../styles/common.css";
@media (min-width: 420px) {
  .submit,
  .single-wide {
    padding-top: 5%;
  }
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
}
</style>
