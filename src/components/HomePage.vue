<template>
  <div style="min-height: 650px">
    <Loader v-if="showLoader" />
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

    <Loader v-if="showLoader" />
    <div v-if="dataNotFound">
      <DataNotFound message="Unable to fetch data, please try again later." />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import QuestionCard from "@/components/QuestionCard.vue";
import DataNotFound from "@/components/DataNotFound.vue";
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
    DataNotFound,
  },
  beforeMount() {
    this.getData();
  },
  mounted() {
    this.scroll();
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.ceil(
            Math.max(
              window.pageYOffset,
              document.documentElement.scrollTop,
              document.body.scrollTop
            )
          ) ===
          parseFloat(document.documentElement.scrollHeight) -
            parseFloat(window.innerHeight);
        if (bottomOfWindow) {
          console.log("end detected");
          this.scrolledToBottom = true; // replace it with your code
        }
      };
    },
    openFilterDialog() {
      this.showFilterCard = !this.showFilterCard;
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
          console.log(JSON.stringify(response.data));
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
      data = JSON.parse(data);
      data.userId = utilities.getUserId(this.$router);
      data = JSON.stringify(data);
      console.log(data);
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
          console.log("filtered res is : " + JSON.stringify(response));
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
    showFilterCard: true,
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
