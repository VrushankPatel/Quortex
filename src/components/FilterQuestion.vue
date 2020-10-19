<template>
  <div>
    <form novalidate @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-95 md-small-size-95">
        <md-card-header>
          <div class="md-title">
            <md-icon>filter_list</md-icon> Apply filters here
            <!-- Search -->
          </div>
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
                <md-input name="topic" id="topic" v-model="form.topic" />
                <span class="md-error" v-if="!$v.form.topic.required"
                  >The topic is required</span
                >
                <span class="md-error" v-else-if="!$v.form.topic.minlength"
                  >Invalid topic.</span
                >
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('topic')">
                  <label for="Question">Question</label>
                  <md-input
                    name="question"
                    id="question"
                    v-model="form.questionDesc"
                  />
                  <span class="md-error" v-if="!$v.form.topic.required"
                    >The question is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.topic.minlength"
                    >Invalid question.</span
                  >
                </md-field>
              </div>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button
            type="button"
            class="md-primary"
            @click="clearFilters()"
            v-if="filters"
            >Clear filters</md-button
          >
          <md-button type="submit" class="md-primary">Search</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";
import actions from "@/common/actions.js";
import properties from "@/common/properties.js";
export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    position: "left",
    filters: false,
    form: {
      subject: "",
      topic: "",
      questionDesc: "",
    },
    subjects: properties.subjectByCodes,
    subjectKeys: Object.keys(properties.subjectByCodes),
  }),
  validations: {
    form: {
      subject: {},
      topic: {},
    },
  },
  methods: {
    clearFilters() {
      location.reload();
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
      // console.log(JSON.stringify(formValues));
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
