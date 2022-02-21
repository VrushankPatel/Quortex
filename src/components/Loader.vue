<template>
  <div class="vld-parent">
    <loading
      loader="bars"
      color="#fff"
      background-color="#000000"
      :opacity="0.5"
      :active.sync="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
    ></loading>
  </div>
</template>
 
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    Loading,
  },
  methods: {
    doAjax() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 5000);
    }, 
  },
};
</script> 