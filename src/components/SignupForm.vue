<template>
  <div class="signup-form">
    <FormulateForm @submit="handleSubmit" class="login-form">
      <h2>Questa</h2>
      <p class="hint-text">Create your account. It's free and only takes a minute.</p>
      <div class="double-wide">
        <FormulateInput
          v-model="formValues.firstname"
          name="firstname"
          type="text"
          label="firstname"
          placeholder="Your Firstname"
          validation="required"
          autocomplete="off"
        />
        <FormulateInput
          v-model="formValues.lastname"
          name="lastname"
          type="text"
          label="lastname"
          placeholder="Your Lastname"
          validation="required"
          autocomplete="off"
        />
      </div>
      <FormulateInput
        v-model="formValues.email"
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="email"
        autocomplete="off"
      />
      <FormulateInput
        v-model="formValues.birthdate"
        type="date"
        name="DOB"
        label="Date of birth"
        placeholder="Date of birth"
        validation="required"
        autocomplete="off"
      />
      <!-- validation="required|after:2019-01-01"
        min="2018-12-01"
      max="2021-01-01"-->
      <FormulateInput
        v-model="formValues.grade"
        name="Grade"
        type="text"
        label="Grade"
        placeholder="Grade"
        validation="required"
        autocomplete="off"
      />
      <FormulateInput
        v-model="formValues.school"
        name="School"
        type="text"
        label="School"
        placeholder="School"
        validation="required"
      />
      <FormulateInput
        v-model="formValues.country"
        name="Country"
        type="text"
        label="Country"
        placeholder="Country"
        validation="required"
      />
      <div class="double-wide">
        <FormulateInput
          v-model="formValues.password"
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
          validation="confirm"
          validation-name="Confirmation"
        />
      </div>
      <FormulateInput type="submit" label="Sign up" />
    </FormulateForm>
    <div class="text-center">
      Already have an account?
      <a href="/Signin">Sign in</a>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "SigninForm",
  data: () => ({
    formValues: {
      role: "USER",
    },
  }),
  methods: {
    async handleSubmit() {
      this.convertDateFormat();
      await fetch("http://questaapp.herokuapp.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: this.formValues,
      })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
      // await axios
      //   .post("http://localhost:8080/signup", this.formValues)
      //   .then((response) => {
      //     this.$swal(response.data + ", please login to continue.");
      //     this.formValues = { role: "USER" };
      //     this.$router.push("/Signin");
      //   })
      //   .catch((error) => {
      //     console.log("error" + error);
      //     // this.$swal(error);
      //   });
    },
    convertDateFormat() {
      this.formValues.birthdate = this.formValues.birthdate
        .split("-")
        .reverse()
        .join("/");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../styles/common.css";
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
</style>
