<template>
  <div>
    <QuestionCard
      v-on:actionLike="like()"
      v-bind:title="this.title"
      v-bind:subject="this.subject"
      v-bind:topic="this.topic"
      v-bind:dateOfPosted="this.dateOfPosted"
      v-bind:questionDesc="this.questionDesc"
      disabled
    />
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
      console.log("getting data");
      var config = {
        method: "post",
        url: "/findallquestions",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
  data: () => ({
    showLoader: false,
    title: "vrushank patel",
    subject: "this is subject",
    topic: "this is tofdpic",
    dateOfPosted: "11-11-2011",
    questionDesc:
      "this is the question bodythis is the question bodythis is the question bodythis is the question bodythis is the question bodythis is the question bodythis is the question bodythis is the question body",
  }),
};
</script>

<style scoped>
</style>
