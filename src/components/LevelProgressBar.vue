<template>
  <div>
    <md-progress-bar
      class="md-accent"
      md-mode="determinate"
      :md-value="amount"
    ></md-progress-bar>
  </div>
</template>
<script>
export default {
  name: "ProgressBarDeterminate",
  data: () => ({
    amount: 20,
  }),
};
</script>
<style lang="scss" scoped>
.md-progress-bar {
  margin: 24px;
  background-color: green;
  height: 6px;
}
</style>