<template>
  <div class="home">
    <SignupForm msg="Welcome to Signin page" />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from "@/components/SignupForm.vue";

export default {
  name: "Signin",
  components: {
    SignupForm,
  },
};
</script>
