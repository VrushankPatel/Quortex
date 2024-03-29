<template>
  <div style="min-height: 650px">
    <div v-if="showLoader">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      <h4>Loading Data</h4>
    </div>

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

    <div v-if="dataNotFound">
      <DataNotFound message="You have not commented any question." />
    </div>

    <div v-if="unableToFetchData">
      <DataNotFound message="Unable to fetch data, please try again later." />
    </div>
  </div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";
import DataNotFound from "@/components/DataNotFound.vue";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import constants from "@/common/constants.js";

export default {
  name: "AnsweredByUser",
  components: {
    QuestionCard,
    DataNotFound,
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
          constants.baseUrl() +
          "/findallbyanswer/" +
          utilities.getUserId(this.$router),
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
      };
      utilities.sendRequest(
        config,
        (response) => {
          if (!response.data.length) {
            this.dataNotFound = true;
          } else {
            this.dataNotFound = false;
          }
          this.questions = response.data;
          this.showLoader = false;
        },
        (error) => {
          this.showLoader = false;
          this.unableToFetchData = true;
          if (
            error.response.data.code == 401 ||
            error.response.data.code == 555
          ) {
            actions.fireLoggedOut(this.$swal, this.$router);
          }
        }
      );
    },
  },
  data: () => ({
    questions: null,
    showLoader: true,
    unableToFetchData: false,
  }),
};
</script>
