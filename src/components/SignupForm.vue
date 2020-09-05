<template>
  <div class="signup-form">
    <FormulateForm v-model="formValues" @submit="handleSubmit" class="login-form">
      <h2>Questa</h2>
      <p class="hint-text">Create your account. It's free and only takes a minute.</p>
      <div class="double-wide">
        <FormulateInput
          name="firstname"
          type="password"
          label="firstname"
          placeholder="Your Firstname"
          validation="required"
        />
        <FormulateInput
          name="lastname"
          type="password"
          label="lastname"
          placeholder="Your Lastname"
          validation="required"
        />
      </div>
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="email"
      />
      <FormulateInput
        type="date"
        name="DOB"
        label="Date of birth"
        placeholder="Date of birth"
        validation="required"
      />
      <!-- validation="required|after:2019-01-01"
        min="2018-12-01"
      max="2021-01-01"-->
      <div class="double-wide">
        <FormulateInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          validation="required"
        />
        <FormulateInput
          name="password_confirm"
          type="password"
          label="Confirm your password"
          placeholder="Confirm password"
          validation="required|confirm"
          validation-name="Confirmation"
        />
      </div>
      <FormulateInput type="submit" label="Register" />
    </FormulateForm>
    <div class="text-center">
      Already have an account?
      <a href="#">Sign in</a>
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
@import "../styles/signup.css";
</style>
