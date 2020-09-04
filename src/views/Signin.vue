<template>
  <div class="home">
    <SigninForm msg="Welcome to Signin page" />
  </div>
</template>

<script>
// @ is an alias to /src
import SigninForm from "@/components/SigninForm.vue";

export default {
  name: "Signin",
  components: {
    SigninForm,
  },
};
</script>
