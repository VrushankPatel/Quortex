<template>
  <div class="home">
    <SignupForm v-on:actionSignUp="signUp" />
    <Loader />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from "@/components/SignupForm.vue";
import Loader from "@/components/Loader.vue";
import axios from "axios";
import properties from "@/common/properties.js";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";

export default {
  name: "Signin",
  components: {
    SignupForm,
    Loader,
  },
  data: () => ({
    baseUrl: properties.baseUrl(),
  }),
  methods: {
    async signUp(formData, swal, router) {
      formData = utilities.trimFormData(formData);
      var data = JSON.stringify(formData);
      var config = {
        method: "post",
        url: this.baseUrl + "/signup",
        headers: utilities.getPlainJSONHeader(),
        data: data,
      };
      axios(config)
        .then(function (response) {
          actions.successSignup(
            swal,
            response.data.code,
            response.data.status,
            router
          );
        })
        .catch(function (error) {
          actions.errorSignup(
            swal,
            error.response.data.code,
            error.response.data.status
          );
        });
    },
  },
};
</script>
