<template>
  <div class="home">
    <SigninForm v-on:actionSignIn="signIn" />
    <Loader v-if="showLoader" />
  </div>
</template>

<script>
// @ is an alias to /src
import SigninForm from "@/components/SigninForm.vue";
import axios from "axios";
import properties from "@/common/properties.js";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import Loader from "@/components/Loader.vue";

export default {
  name: "Signin",
  components: {
    SigninForm,
    Loader,
  },
  data: () => ({
    baseUrl: properties.baseUrl(),
    showLoader: false,
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
          this.showLoader = false;
          localStorage.setItem("questauserId", response.data.userId);
          localStorage.setItem("questatoken", response.data.token);
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
  },
};
</script>
