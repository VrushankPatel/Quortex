<template>
  <div class="home">
    <SigninForm v-on:actionSignIn="signIn" />
  </div>
</template>

<script>
// @ is an alias to /src
import SigninForm from "@/components/SigninForm.vue";
import axios from "axios";
import properties from "@/common/properties.js";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";

export default {
  name: "Signin",
  components: {
    SigninForm,
  },
  data: () => ({
    baseUrl: properties.baseUrl(),
  }),methods: {
    async signIn(formValues, swal, router) {
      formValues = utilities.trimFormData(formValues);
      var data = JSON.stringify(formValues);
      var config = {
        method: "post",
        url: this.baseUrl + "/login",
        headers: utilities.getPlainJSONHeader(),
        data: data,
      };
      axios(config)
        .then(function (response) {
          actions.successSignin(
            swal,
            response.data.code,
            response.data.status,
            router
          );
        })
        .catch(function (error) {
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
