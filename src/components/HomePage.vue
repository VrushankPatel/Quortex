<template>
  <div style="min-height: 650px">
    <div>
      <md-card
        class="md-layout-item md-size-95 md-small-size-95 customcard"
        v-if="!dataNotFound"
      >
        <div
          v-if="!dataNotFound"
          class="questtext"
          @click="openFilterDialog()"
          style="background-color: #3b3b3b; color: white"
        >
          Search
          <md-icon style="color: white" v-if="!showFilterCard"
            >arrow_drop_down</md-icon
          >
          <md-icon style="color: white" v-else>arrow_drop_up</md-icon>
        </div>
      </md-card>
      <FilterQuestion
        v-if="!dataNotFound && showFilterCard"
        v-on:doFilter="doFilter"
        v-on:clearFilter="clearFilter"
        defaultSelection="WITHANSWER"
      />
      <md-card
        class="md-layout-item md-size-95 md-small-size-95 customcard"
        v-if="!dataNotFound"
      >
        <div
          v-if="!dataNotFound"
          class="questtext"
          @click="openAskQuestionDialog()"
          style="background-color: #3b3b3b; color: white"
        >
          Ask your question
          <md-icon style="color: white" v-if="!showAskQuestionDialog"
            >arrow_drop_down</md-icon
          >
          <md-icon style="color: white" v-else>arrow_drop_up</md-icon>
        </div>
      </md-card>
      <AskQuestionCard
        v-if="showAskQuestionDialog"
        v-on:actionReload="getData"
        disabled
      />
    </div>
    <div v-if="showLoader">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      <h4>Loading Data</h4>
    </div>
    <div v-if="nonfiltered">
      <div v-for="item in questions" :key="item.questionId">
        <QuestionCard
          :item="item"
          :subject="item.subject"
          :topic="item.topic"
          :nickName="item.nickName"
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
          :nickName="item.nickName"
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

    <div v-if="dataNotFound">
      <DataNotFound message="Unable to fetch data, please try again later." />
    </div>
  </div>
</template>

<script>
// import Loader from "@/components/Loader.vue";
import QuestionCard from "@/components/QuestionCard.vue";
import DataNotFound from "@/components/DataNotFound.vue";
import AskQuestionCard from "@/components/AskQuestionCard.vue";
import FilterQuestion from "@/components/FilterQuestion.vue";
import axios from "axios";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import constants from "@/common/constants.js";
export default {
  name: "HomePage",
  components: {
    QuestionCard,
    // Loader,
    FilterQuestion,
    AskQuestionCard,
    DataNotFound,
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    clearFilter() {
      this.showLoader = true;
      this.questions = {};
      this.getData();
    },
    openFilterDialog() {
      this.showFilterCard = !this.showFilterCard;
    },
    getData() {
      var config = {
        method: "post",
        url:
          constants.baseUrl() +
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
          this.showLoader = false;
          this.dataNotFound = true;
        });
    },
    doFilter(data) {
      this.nonfiltered = false;
      this.questions = null;
      this.showLoader = true;
      this.filtered = true;
      data = JSON.parse(data);
      data.userId = utilities.getUserId(this.$router);
      data = JSON.stringify(data);
      var config = {
        method: "post",
        url: constants.baseUrl() + "/findallbysubjecttopic",
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
    showFilterCard: false,
    dataNotFound: false,
  }),
};
</script>

<style scoped>
.questtext {
  padding: 10px;
}
.md-dialog ::v-deep .md-dialog-container {
  width: 40%;
}
.questtext {
  cursor: pointer;
}
.customcard {
  border: 1px solid lightgrey;
}
</style>
