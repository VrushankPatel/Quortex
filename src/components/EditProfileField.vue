<template>
  <div class="signup-form">
    <FormulateForm @submit="editProfile" class="login-form">
      <div v-if="dataNotFound">
        <DataNotFound message="Unable to fetch data, please try again later." />
      </div>
      <center v-if="showLoader">
        <div>
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          <h4>Loading Data</h4>
        </div>
      </center>
      <div v-if="!showLoader && !dataNotFound">
        <h2>Questa</h2>
        <!-- <p>{{ formData }}</p> -->
        <center>
          <u>
            <p style="font-size: 120%; color: grey">Edit Profile</p>
          </u>
        </center>
        <div class="double-wide">
          <FormulateInput
            v-model="formData.firstName"
            name="firstname"
            type="text"
            label="firstname"
            placeholder="Your Firstname"
            validation="required"
            autocomplete="off"
          />
          <FormulateInput
            id="lastname"
            v-model="formData.lastName"
            name="lastname"
            type="text"
            label="lastname"
            placeholder="Your Lastname"
            validation="required"
            autocomplete="off"
          />
        </div>
        <div class="double-wide">
          <FormulateInput
            v-model="formData.nickName"
            name="nickName"
            type="text"
            label="Nick Name"
            placeholder="Your Nickname"
            validation="required"
            autocomplete="off"
          />
          <FormulateInput
            v-model="formData.email"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            validation="email"
            autocomplete="off"
          />
        </div>
        <!-- validation="required|after:2019-01-01"
        min="2018-12-01"
      max="2021-01-01"-->
        <div class="double-wide">
          <FormulateInput
            v-model="formData.birthdate"
            type="date"
            name="DOB"
            label="Date of birth"
            placeholder="Date of birth"
            validation="required"
            autocomplete="off"
          />
          <FormulateInput
            v-model="formData.grade"
            name="Grade"
            type="select"
            label="Grade"
            placeholder="Grade"
            validation="required"
            autocomplete="off"
            :options="grades"
          />
        </div>
        <div class="double-wide">
          <FormulateInput
            v-model="formData.school"
            name="School"
            type="text"
            label="School"
            placeholder="School"
            validation="required"
          />
          <FormulateInput
            v-model="formData.country"
            name="Country"
            type="select"
            label="Country"
            placeholder="Choose your country"
            validation="required"
            autocomplete="off"
            :options="countries"
          />
        </div>
        <!-- <FormulateInput
        v-model="formData.country"
        name="Country"
        type="text"
        label="Country"
        placeholder="Country"
        validation="required"
      /> -->
        <div class="double-wide" v-if="changePassword">
          <FormulateInput
            name="password"
            id="passwordConf"
            type="password"
            label="Password"
            placeholder="Your password"
            validation
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
        <div class="double-wide">
          <FormulateInput
            v-if="toggler"
            type="button"
            @click="togglePasswordFields()"
            label="Change your password"
          />
          <FormulateInput
            v-else
            type="button"
            @click="togglePasswordFields()"
            label="Keep password as it is"
          />

          <FormulateInput class="applybtn" type="submit" label="Apply" />
        </div>

        <div
          class="restoredefault"
          title="Restore Defaults"
          @click="restoreFormDefaults()"
        >
          <md-icon>restore</md-icon>
        </div>
        <div
          class="spendTime"
          title="Restore Defaults"
          @click="restoreFormDefaults()"
        >
          Total time spend : {{ this.totalTimespendByUser }}
        </div>
      </div>
    </FormulateForm>
  </div>
</template>

<script>
import properties from "@/common/properties.js";
import axios from "axios";
import DataNotFound from "@/components/DataNotFound.vue";
import countriesNames from "@/common/countriesNames.js";
import utilities from "@/common/utilities.js";
import cryptoUtil from "@/common/cryptoUtil.js";
import grades from "@/common/grades.js";
export default {
  name: "EditProfileField",
  components: {
    DataNotFound,
    // Loader,
  },
  data: () => ({
    totalTimespendByUser: utilities.secondsToHms(
      JSON.parse(cryptoUtil.getItem("userProgressLevel")).totalSpendTimeByUser
    ),
    dataNotFound: false,
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      nickName: "",
      birthdate: "",
      grade: "",
      school: "",
      country: "",
      role: "USER",
    },
    grades: grades.grades,
    showLoader: true,
    changePassword: false,
    baseUrl: properties.baseUrl(),
    toggler: true,
    countries: countriesNames.countries,
    defaults: {},
  }),
  beforeMount() {
    this.getUserData();
  },

  methods: {
    restoreFormDefaults() {
      this.formData["firstName"] = this.defaults.firstName;
      this.formData["lastName"] = this.defaults.lastName;
      this.formData["nickName"] = this.defaults.nickName;
      this.formData["email"] = this.defaults.email;
      this.formData["birthdate"] = this.defaults.birthdate;
      this.formData["grade"] = this.defaults.grade;
      this.formData["school"] = this.defaults.school;
      this.formData["country"] = this.defaults.country;
    },
    editProfile() {
      if (this.changePassword == true) {
        const password = document.getElementById("passwordConf").value;
        let pwdRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!pwdRegEx.test(password)) {
          this.$swal.fire({
            icon: "error",
            title: "Oops..",
            text:
              "Password should be of eight characters and must contain one uppercase, one lowercase, one number and one special character.",
          });
          return;
        }
        this.formData["password"] = password;
      }
      this.formData["userId"] = utilities.getUserId(this.$router);
      this.changeProfile(this.formData);
    },
    async changeProfile(formData) {
      var config = {
        method: "post",
        url: properties.baseUrl() + "/updateuserprofile",
        headers: utilities.getAuthJSONHeader(),
        data: formData,
      };
      console.log(config);
      this.showLoader = true;
      await axios(config)
        .then((response) => {
          console.log(response);
          this.showLoader = false;
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Your profile updated successfully.",
          });
          this.$emit("closeEditProfile");
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          this.showLoader = false;
          this.$swal.fire({
            icon: "error",
            title: "Email already exists.",
            text: "An Account with provided email already exists.",
          });
        });
    },
    togglePasswordFields() {
      delete this.formData["password"];
      this.changePassword = !this.changePassword;
      this.toggler = !this.toggler;
    },
    getUserData() {
      var config = {
        method: "post",
        url:
          properties.baseUrl() +
          "/getuser/" +
          utilities.getUserId(this.$router),
        headers: utilities.getAuthJSONHeader(),
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          this.showLoader = false;
          this.defaults = response.data;
          this.restoreFormDefaults();
        })
        .catch((error) => {
          console.log(error);
          this.showLoader = false;
          this.dataNotFound = true;
          // actions.fireLoggedOut(this.$swal, this.$router);
        });
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
  height: 300%;
  max-width: 500px;
  box-sizing: border-box;
  max-height: 120%;
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
.md-content {
  border-radius: 0.5em;
  background-color: transparent;
  max-height: 900px;
  height: auto;
  overflow: auto;
}
.signup-form .md-scrollbar {
  background-color: transparent;
  max-height: auto;
}
.restoredefault {
  cursor: pointer;
}

.spendTime {
  float: right;
}
.applybtn {
  float: right;
  padding-left: 34.5%;
}
</style>
