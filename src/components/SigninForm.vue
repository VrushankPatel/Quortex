<template>
  <div class="signup-form">
    <FormulateForm v-model="formValues" @submit="handleSubmit" class="login-form">
      <h2>Questa</h2>
      <div class="single-wide">
        <FormulateInput
          name="email"
          type="email"
          label="Email address"
          placeholder="Email address"
          validation="email"
        />
      </div>
      <FormulateInput
        name="password"
        type="password"
        label="Password"
        placeholder="Your password"
        validation="required"
      />

      <FormulateInput class="submit" type="submit" label="Register" />
    </FormulateForm>
    <div class="text-center">
      Don't have an account?
      <a href="/Signup">Sign up</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SigninForm",
  data: () => ({
    formValues: {},
  }),
  methods: {
    handleSubmit() {
      alert("temp");
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
  .single-wide,
  .double-wide {
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
