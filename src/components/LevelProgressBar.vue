<template>
  <div>
    <md-progress-bar
      class="md-accent"
      md-mode="determinate"
      :md-value="level"
    ></md-progress-bar>
  </div>
</template>
<script>
export default {
  name: "ProgressBarDeterminate",
  props: {
    level: String,
  },
};
</script>
<style lang="scss" scoped>
.md-progress-bar {
  margin: 24px;
  background-color: green;
  height: 6px;
}
</style>