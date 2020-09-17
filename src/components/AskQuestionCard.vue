<template>
  <div>
    <form novalidate @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-95 md-small-size-95">
        <md-card-header>
          <div class="md-title">Didn't find your question? ask your question here..</div>
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
                  <md-option value="Calculas">Calculas</md-option>
                  <md-option value="Algebra">Algebra</md-option>
                </md-select>
                <span class="md-error">The Subject is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('topic')">
                <label for="topic">Topic</label>
                <md-input name="topic" id="topic" v-model="form.topic" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.topic.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.topic.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('question')">
            <label for="question">Type your question here</label>
            <md-textarea
              type="questin"
              name="question"
              id="question"
              autocomplete="question"
              v-model="form.question"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.question.required">The question is required</span>
            <span class="md-error" v-else-if="!$v.form.question.minlength">Invalid question</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      subject: null,
      topic: null,
      question: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      subject: {
        required,
      },
      topic: {
        required,
        minLength: minLength(3),
      },
      question: {
        required,
        minLength: minLength(3),
      },
    },
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
      this.form.question = null;
    },
    saveUser() {
      this.sending = true;
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
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
