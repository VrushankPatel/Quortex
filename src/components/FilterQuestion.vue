<template>
  <div>
    <form novalidate @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-95 md-small-size-95">
        <md-card-header>
          <div class="md-title">Apply filters from here....</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('subject')">
                <label for="subject">Subject</label>
                <md-select name="subject" id="subject" v-model="form.subject" md-dense>
                  <md-option value="Calculas">Calculas</md-option>
                  <md-option value="Algebra">Algebra</md-option>
                </md-select>
                <span class="md-error">The Subject is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('topic')">
                <label for="topic">Topic</label>
                <md-input name="topic" id="topic" v-model="form.topic" />
                <span class="md-error" v-if="!$v.form.topic.required">The topic is required</span>
                <span class="md-error" v-else-if="!$v.form.topic.minlength">Invalid topic.</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button
            type="button"
            class="md-primary"
            @click="clearFilters()"
            v-if="filters"
          >Clear filters</md-button>
          <md-button type="submit" class="md-primary">Search</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import actions from "@/common/actions.js";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    position: "left",
    filters: false,
    form: {
      subject: null,
      topic: null,
    },
  }),
  validations: {
    form: {
      subject: {
        required,
      },
      topic: {},
    },
  },
  methods: {
    clearFilters() {
      this.$emit("clearFilter");
      this.filters = false;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    actionPostQuestion() {
      const formValues = this.form;
      if (formValues["topic"] == null) {
        formValues["topic"] = "";
      }
      actions.checkSignedIn();
      const data = JSON.stringify(formValues);
      this.$emit("doFilter", data);
    },
    validateUser() {
      this.filters = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.actionPostQuestion();
      }
    },
  },
};
</script>

