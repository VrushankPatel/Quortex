<template>
  <AskQuestionCard disabled />
</template>

<script>
import AskQuestionCard from "@/components/AskQuestionCard.vue";
export default {
  name: "HomePage",
  components: {
    AskQuestionCard,
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData: function () {
      console.log("get data");
    },
    like() {
      alert("Liked");
    },
  },
};
</script>

<style scoped>
</style>
