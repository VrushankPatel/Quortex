<template>
  <div>
    <AskQuestionCard disabled />
    <QuestionCard v-on:actionLike="like()" disabled />
    <Loader v-if="showLoader" />
  </div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";
import AskQuestionCard from "@/components/AskQuestionCard.vue";
import Loader from "@/components/Loader.vue";
export default {
  name: "HomePage",
  components: {
    QuestionCard,
    AskQuestionCard,
    Loader,
  },
  methods: {
    like() {
      alert("Liked");
    },
  },
  data: () => ({
    showLoader: false,
  }),
};
</script>

<style scoped>
</style>
