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
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('subject')">
                <label for="Search Type">Search Type</label>
                <md-select
                  name="searchType"
                  id="searchType"
                  value="All questions"
                  v-model="form.searchType"
                  md-dense
                >
                  <div v-for="item in searchTypesKeys" :key="item">
                    <md-option v-bind:value="searchType[item][1]">{{
                      searchType[item][0]
                    }}</md-option>
                  </div>
                </md-select>
                <span class="md-error">The SearchType is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <!-- for down -->
        <!-- v-if="filters" -->
        <md-card-actions>
          <md-button type="button" class="md-primary" @click="clearFilters()"
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
import actions from "@/common/actions.js";
import constants from "@/common/constants.js";
import cryptoUtil from "@/common/cryptoUtil.js";
export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    position: "left",
    filters: false,
    form: JSON.parse(cryptoUtil.getItem("FilterData")) || {
      subject: "",
      topic: "",
      questionDesc: "",
      searchType: "ALL",
    },
    subjects: constants.subjectByCodes,
    searchType: constants.searchTypes,
    subjectKeys: Object.keys(constants.subjectByCodes),
    searchTypesKeys: Object.keys(constants.searchTypes),
  }),
  validations: {
    form: {
      subject: {},
      topic: {},
    },
  },
  beforeDestroy() {
    // console.log(JSON.stringify(this.form));
    this.callSaveFilter();
  },
  methods: {
    callSaveFilter() {
      cryptoUtil.setItem("FilterData", JSON.stringify(this.form));
    },
    clearFilters() {
      cryptoUtil.setItem(
        "FilterData",
        JSON.stringify({
          subject: "",
          topic: "",
          questionDesc: "",
          searchType: "ALL",
        })
      );
      this.$emit("clearFilter");
      // location.reload();
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
      actions.checkLoggedIn(this.$router);
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
