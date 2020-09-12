<template>
  <div>
    <md-card class="qacard">
      <md-card-header style="float: left;width: 100%;">
        <div class="md-title" style="float: left;">Question title goes here</div>
      </md-card-header>

      <md-card-content>Question description goes here.Question description goes here.Question description goes here.Question description goes here.Question description goes here.Question description goes here.Question description goes here.</md-card-content>

      <md-card-actions>
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions>
      <md-divider></md-divider>
      <md-bottom-bar md-type="shift" md-sync-route>
        <md-bottom-bar-item
          v-on:click="actionLike()"
          md-label="Post 1"
          md-icon="/assets/icon-whatshot.svg"
        >Like</md-bottom-bar-item>
        <md-bottom-bar-item to="#" md-label="Post 2" md-icon="/assets/icon-whatshot.svg">DisLike</md-bottom-bar-item>
        <md-bottom-bar-item to="#" md-label="Post 3" md-icon="/assets/icon-whatshot.svg">Follow</md-bottom-bar-item>
      </md-bottom-bar>
    </md-card>
  </div>
</template>

<script>
export default {
  methods: {
    actionLike() {
      this.$emit("actionLike");
    },
  },
};
</script>