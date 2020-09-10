<template>
  <div class="home">
    <SignupForm v-on:actionSignUp="signUp" />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from "@/components/SignupForm.vue";
import axios from "axios";
import properties from "@/common/properties.js";
import utilities from "@/common/utilities.js";

export default {
  name: "Signin",
  components: {
    SignupForm,
  },
  data: () => ({
    baseUrl: properties.baseUrl(),
  }),
  methods: {
    async signUp(formData, swal, router) {
      console.log(utilities.getPlainJSONHeader());
      formData = utilities.trimFormData(formData);
      console.log(formData);
      var data = JSON.stringify(formData);
      var config = {
        method: "post",
        url: this.baseUrl + "/signup",
        headers: utilities.getPlainJSONHeader(),
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
          swal.fire({
            icon: "success",
            title: "Success",
            text: "Account successfully created, \nPlease signin to continue.",
          });
          router.push("/Signin");
        })
        .catch(function (error) {
          console.log(error);
        });
      return "something";
    },
  },
};
</script>
