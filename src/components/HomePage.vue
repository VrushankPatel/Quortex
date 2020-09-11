<template>
  <div class="hello" >
    <h1>Hi {{message.firstName}}!Welcome to Questa world</h1>
    <div  class="success">{{ message.firstName }}testsdfsdf</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    console.log('Component has been created!');
    this.$emit("actionHome");
  }
}; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
