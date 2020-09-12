<template>
  <div>
    <QuestionCard v-on:actionLike="like()" disabled />
  </div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";
export default {
  name: "HomePage",
  components: {
    QuestionCard,
  },
  methods: {
    like() {
      alert("Liked");
    },
  },
};
</script>

<style scoped>
</style>
