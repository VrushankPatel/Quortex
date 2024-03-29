<template>
  <div>
    <form novalidate @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-95 md-small-size-95">
        <md-card-header>
          <div class="md-title">Didn't find your answer? Ask here.</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('subject')">
                <label for="subject">Subject</label>
                <md-select
                  name="subject"
                  id="subject"
                  v-model="form.subject"
                  md-dense
                  :disabled="sending"
                >
                  <div v-for="item in subjectKeys" :key="item">
                    <md-option v-bind:value="item">{{
                      subjects[item]
                    }}</md-option>
                  </div>
                </md-select>
                <span class="md-error">The Subject is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('topic')">
                <label for="topic">Topic</label>
                <md-input
                  name="topic"
                  id="topic"
                  v-model="form.topic"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.topic.required"
                  >The topic is required</span
                >
                <span class="md-error" v-else-if="!$v.form.topic.minlength"
                  >Invalid topic.</span
                >
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('questionDesc')">
            <label for="question">Type your question here</label>
            <md-textarea
              type="text"
              name="question"
              id="question"
              autocomplete="question"
              v-model="form.questionDesc"
              md-autogrow
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.questionDesc.required"
              >The question is required</span
            >
            <span class="md-error" v-else-if="!$v.form.questionDesc.minlength"
              >Invalid question</span
            >
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Submit</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-position="position" :md-active.sync="showSuccessSnackBar"
        >Your question has been submitted!</md-snackbar
      >
      <md-snackbar :md-position="position" :md-active.sync="showFailureSnackBar"
        >Error occured, Unable to submit question</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import constants from "@/common/constants.js";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    position: "left",
    form: {
      subject: null,
      topic: null,
      questionDesc: null,
      createDate: null,
      userId: null,
    },
    showSuccessSnackBar: false,
    showFailureSnackBar: false,
    sending: false,
    baseUrl: constants.baseUrl(),
    lastUser: null,
    subjects: constants.subjectByCodes,
    subjectKeys: Object.keys(constants.subjectByCodes),
  }),
  validations: {
    form: {
      subject: {
        required,
      },
      topic: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(50),
      },
      questionDesc: {
        required,
        minLength: minLength(3),
      },
    },
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.subject = null;
      this.form.topic = null;
      this.form.questionDesc = null;
      this.form.createDate = null;
      this.form.userId = null;
    },
    actionPostQuestion() {
      this.sending = true;
      var moment = require("moment");
      this.form["createDate"] = moment(new Date()).format("yyyy-MM-DD");
      this.form["userId"] = utilities.getUserId(this.$router);

      this.postQuestion(this.form);
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.actionPostQuestion();
      }
    },
    postQuestion(formValues) {
      actions.checkLoggedIn(this.$router);
      const trimmedFormValues = utilities.trimFormData(formValues);
      const data = JSON.stringify(trimmedFormValues);
      var config = {
        method: "post",
        url: constants.baseUrl() + "/createquestion",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: data,
      };
      utilities.sendRequest(
        config,
        (response) => {
          var result = actions.successQuestionPost(
            response.data.code,
            response.data.status
          );
          if (result) {
            window.setTimeout(() => {
              this.showSuccessSnackBar = true;
              this.sending = false;
            }, 1500);
            this.clearForm();
            this.$emit("actionReload");
          } else {
            window.setTimeout(() => {
              this.showFailureSnackBar = true;
              this.sending = false;
            }, 1500);
          }
        },
        (error) => {
          window.setTimeout(() => {
            this.showFailureSnackBar = true;
            this.sending = false;
          }, 1500);
          actions.errorQuestionPost(
            error.response.data.code,
            error.response.data.status,
            this.$router,
            this.$swal
          );
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
