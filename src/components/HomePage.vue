<template>
  <div style="min-height: 650px">
    <Loader v-if="showLoader" />
    <md-card class="md-layout-item md-size-95 md-small-size-95 customcard"
      ><div class="questtext" @click="openAskQuestionDialog()">
        Ask your question
      </div></md-card
    >
    <FilterQuestion v-on:doFilter="doFilter" v-on:clearFilter="clearFilter" />
    <div v-if="nonfiltered">
      <div v-for="item in questions" :key="item.questionId">
        <QuestionCard
          :item="item"
          :subject="item.subject"
          :topic="item.topic"
          :dateOfPosted="item.createDate"
          :questionDesc="item.questionDesc"
          :answerList="item.answerList"
          :questionId="item.questionId"
          :noOfAnswers="item.noOfAnswers"
          :noOfLikes="item.noOfLikes"
          :noOfFollowers="item.noOfFollowers"
          v-on:actionReload="getData"
          disabled
        />
      </div>
    </div>

    <div v-if="filtered">
      <div v-for="item in questions" :key="item.questionId">
        <QuestionCard
          :item="item"
          :subject="item.subject"
          :topic="item.topic"
          :dateOfPosted="item.createDate"
          :questionDesc="item.questionDesc"
          :answerList="item.answerList"
          :questionId="item.questionId"
          :noOfAnswers="item.noOfAnswers"
          :noOfLikes="item.noOfLikes"
          :noOfFollowers="item.noOfFollowers"
          v-on:actionReload="getData"
          disabled
        />
      </div>
    </div>

    <Loader v-if="showLoader" />
    <md-dialog :md-active.sync="showAskQuestionDialog">
      <AskQuestionCard v-on:actionReload="getData" disabled />
    </md-dialog>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import QuestionCard from "@/components/QuestionCard.vue";
import AskQuestionCard from "@/components/AskQuestionCard.vue";
import FilterQuestion from "@/components/FilterQuestion.vue";
import axios from "axios";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import properties from "@/common/properties.js";
export default {
  name: "HomePage",
  components: {
    QuestionCard,
    Loader,
    FilterQuestion,
    AskQuestionCard,
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    clearFilter() {
      this.filtered = false;
      this.nonfiltered = true;
      this.showLoader = true;
      this.getData();
    },
    getData() {
      var config = {
        method: "post",
        url:
          properties.baseUrl() +
          "/findallquestions/" +
          utilities.getUserId(this.$router),
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
      };
      axios(config)
        .then((response) => {
          this.questions = response.data;
          this.showLoader = false;
        })
        .catch((error) => {
          if (
            error.response.data.code == 401 ||
            error.response.data.code == 555
          ) {
            actions.fireLoggedOut(this.$swal, this.$router);
            return;
          }
        });
    },
    doFilter(data) {
      this.showLoader = true;
      this.filtered = true;
      this.nonfiltered = false;
      var config = {
        method: "post",
        url: properties.baseUrl() + "/findallbysubjecttopic",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: data,
      };
      axios(config)
        .then((response) => {
          this.questions = response.data;
          this.showLoader = false;
        })
        .catch((error) => {
          window.setTimeout(() => {
            this.sending = false;
          }, 1500);
          actions.errorQuestionPost(
            error.response.data.code,
            error.response.data.status,
            this.$router,
            this.$swal
          );
        });
    },
    openAskQuestionDialog() {
      this.showAskQuestionDialog = !this.showAskQuestionDialog;
    },
  },
  data: () => ({
    questions: null,
    showLoader: true,
    nonfiltered: true,
    filtered: false,
    showAskQuestionDialog: false,
  }),
};
</script>

<style scoped>
.questtext {
  padding: 10px;
}
.customcard {
  cursor: pointer;
  font-size: 14px;
}
.customcard:hover {
  border-radius: 10px;
  text-decoration: underline;
  transition-property: all;
  animation-duration: 2s;
}
.md-dialog ::v-deep .md-dialog-container {
  width: 40%;
}
</style>
