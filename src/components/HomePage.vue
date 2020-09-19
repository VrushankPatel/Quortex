<template>
  <div style="min-height:650px">
    <Loader v-if="showLoader" />
    <div v-for="item in questions" :key="item.questionId">
      <QuestionCard
        v-on:actionLike="like()"
        :subject="item.subject"
        :topic="item.topic"
        :dateOfPosted="item.createDate"
        :questionDesc="item.questionDesc"
        :answerList="item.answerList"
        :questionId="item.questionId"
        v-on:actionReload="getData"
        disabled
      />
    </div>
    <Loader v-if="showLoader" />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import QuestionCard from "@/components/QuestionCard.vue";
import axios from "axios";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
export default {
  name: "HomePage",
  components: {
    QuestionCard,
    Loader,
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    like() {
      // alert("Liked");
    },
    getData() {
      var config = {
        method: "post",
        url: "/findallquestions",
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
  },
  data: () => ({
    questions: null,
    showLoader: true,
  }),
};
</script>

<style scoped>
</style>
