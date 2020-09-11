<template>
  <div class="home">
     <h1>Hi {{message.firstName}} {{message.lastName}}! Welcome to Questa world</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import utilities from "@/common/utilities.js";

export default {
  data() {
    return {
      message: '{}'
      };
  },
  created() {
      var config = {
        method: "post",
        url: "/getuser/" +localStorage.getItem('userId'),
        headers: utilities.getAuthJSONHeader(),
        data: null,
      };
      axios(config)
        .then(response => {this.message = response.data})
        .catch(function (error) {
          alert("error"+error)
        });
  }
};
</script>
