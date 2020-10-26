<template>
  <div class="home">
    <SigninForm
      v-on:toggleWindows="toggleSigninForgotPwdWindows"
      v-on:actionSignIn="signIn"
      v-if="signin"
    />
    <ForgotPasswordField
      v-on:toggleWindows="toggleSigninForgotPwdWindows"
      v-on:actionForgotPassword="actionForgotPassword"
      v-else
    />
    <Loader v-if="showLoader" />
  </div>
</template>

<script>
// @ is an alias to /src
import SigninForm from "@/components/SigninForm.vue";
import ForgotPasswordField from "@/components/ForgotPasswordField.vue";
import axios from "axios";
import properties from "@/common/properties.js";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import cryptoUtil from "@/common/cryptoUtil.js";
import Loader from "@/components/Loader.vue";

export default {
  name: "Signin",
  beforeMount() {
    document.body.style.backgroundColor = "rgb(99,115,138)";
  },
  components: {
    SigninForm,
    Loader,
    ForgotPasswordField,
  },
  data: () => ({
    baseUrl: properties.baseUrl(),
    showLoader: false,
    signin: true,
  }),
  methods: {
    async signIn(formValues, swal, router) {
      this.showLoader = true;
      const trimmedFormValues = utilities.trimFormData(formValues);
      const data = JSON.stringify(trimmedFormValues);
      var config = {
        method: "post",
        url: this.baseUrl + "/login",
        headers: utilities.getPlainJSONHeader(),
        data: data,
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.showLoader = false;
          cryptoUtil.setItem("questauserId", response.data.userId);
          cryptoUtil.setItem("questatoken", response.data.token);
          cryptoUtil.setItem("questausertype", response.data.role);
          actions.successSignin(
            swal,
            response.data.code,
            response.data.status,
            router
          );
        })
        .catch((error) => {
          this.showLoader = false;
          actions.errorSignin(
            swal,
            error.response.data.code,
            error.response.data.status
          );
        });
    },
    async actionForgotPassword(formData) {
      this.showLoader = true;
      const trimmedFormValues = utilities.trimFormData(formData);
      const data = JSON.stringify(trimmedFormValues);
      var config = {
        method: "post",
        url: properties.baseUrl() + "/resetpassword",
        headers: utilities.getPlainJSONHeader(),
        data: data,
      };

      axios(config)
        .then((response) => {
          this.showLoader = false;
          actions.successForgotPassword(
            this.$swal,
            response.data.code,
            response.data.status
          );
          this.toggleSigninForgotPwdWindows();
        })
        .catch((error) => {
          console.log(error);
          this.showLoader = false;
        });
    },
    toggleSigninForgotPwdWindows() {
      this.signin = !this.signin;
    },
  },
};
</script>
