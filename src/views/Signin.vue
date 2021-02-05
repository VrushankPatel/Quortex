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
import SigninForm from "@/components/SigninForm.vue";
import ForgotPasswordField from "@/components/ForgotPasswordField.vue";
import constants from "@/common/constants.js";
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
    baseUrl: constants.baseUrl(),
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
      utilities.sendRequest(
        config,
        (response) => {
          this.showLoader = false;
          cryptoUtil.setItem(
            constants.getQuortexUserId(),
            response.data.userId
          );
          cryptoUtil.setItem(constants.getQuortexToken(), response.data.token);
          cryptoUtil.setItem(
            constants.getQuortexUserType(),
            response.data.role
          );
          cryptoUtil.setItem(constants.getSignedInDate(), String(new Date()));
          cryptoUtil.setItem(
            "userProgressLevel",
            JSON.stringify(response.data.userProgressLevel)
          );
          cryptoUtil.setItem(
            "FilterData",
            JSON.stringify({
              subject: "",
              topic: "",
              questionDesc: "",
              searchType: constants.searchTypes[1][1],
            })
          );
          actions.actionSignin(
            swal,
            response.data.code,
            response.data.status,
            router
          );
        },
        (error) => {
          this.showLoader = false;
          actions.actionSignin(
            swal,
            error.response.data.code,
            error.response.data.status,
            router
          );
        }
      );
    },
    async actionForgotPassword(formData) {
      this.showLoader = true;
      const trimmedFormValues = utilities.trimFormData(formData);
      const data = JSON.stringify(trimmedFormValues);
      var config = {
        method: "post",
        url: constants.baseUrl() + "/resetpassword",
        headers: utilities.getPlainJSONHeader(),
        data: data,
      };
      utilities.sendRequest(
        config,
        (response) => {
          this.showLoader = false;
          actions.successForgotPassword(
            this.$swal,
            response.data.code,
            response.data.status
          );
          this.toggleSigninForgotPwdWindows();
        },
        (error) => {
          error;
          this.$swal.fire({
            icon: "error",
            title: "User not found",
            text: "There is no account registered with this mail id.",
          });
          this.showLoader = false;
        }
      );
    },
    toggleSigninForgotPwdWindows() {
      this.signin = !this.signin;
    },
  },
};
</script>
