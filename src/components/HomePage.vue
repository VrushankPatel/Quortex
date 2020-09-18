<template>
  <div>
    <div v-for="item in questions" :key="item.questionId">
      {{item}}
      <QuestionCard
        v-on:actionLike="like()"
        :subject="item.subject"
        :topic="item.topic"
        :dateOfPosted="item.createDate"
        :questionDesc="item.questionDesc"
        disabled
      />
    </div>
    <Loader v-if="showLoader" />
  </div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";
import Loader from "@/components/Loader.vue";
import axios from "axios";
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
      alert("Liked");
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
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
  data: () => ({
    questions: null,
    showLoader: false,
  }),
};
</script>

<style scoped>
</style>
