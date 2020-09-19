<template>
  <div style="padding-top:1%">
    <md-card class="qacard">
      <div style="background-color:#448aff;color:white">
        <md-card-header style="width: 100%;float: left">
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100"></div>
          </div>

          <div class="md-layout md-gutter md-alignment-center">
            <div
              class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
            >
              <div class="md-title" style="float: left;">Topic : {{topic}}</div>
            </div>
            <div
              class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
            >
              <div class="md-title" style="float: right;">Subject : {{subject}}</div>
            </div>

            <div
              class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
            >
              <div class="md-title" style="float: right;font-size:115%">Posted on : {{dateOfPosted}}</div>
            </div>
          </div>
        </md-card-header>
        <div class="md-layout md-gutter md-alignment-center">
          <div
            class="md-layout-item md-large-size-95 md-medium-size-95 md-small-size-50 md-xsmall-size-100"
          >
            <div
              class="md-title"
              style="float: left; text-align:left;font-size:120%"
            >{{questionDesc}}</div>
          </div>
        </div>
        <md-divider></md-divider>
        <md-card-actions>
          <div style="width:100%;float:left;">
            <md-button style="color:white;float:left;" @click="toggleAnswers()">
              <md-badge class="md-primary" :md-content="noOfAnswers">
                <span style="padding-top:9%">Show Answers......</span>
              </md-badge>
            </md-button>
          </div>
          <div style="width:100%;float:left;padding-left:1.5%">
            <span
              style="text-transform-lowercase;float:left;"
            >{{noOfLikes}} Likes {{noOfFollowers}} Followers</span>
          </div>
          <md-button style="color:white" @click="answerTheQuestion({questionId})">Answer</md-button>
          <md-button
            style="color:white"
            v-if="follow"
            @click="followTheQuestion({questionId})"
          >Follow</md-button>
          <md-button
            style="color:white"
            v-if="following"
            @click="unfollowTheQuestion({questionId})"
          >Following</md-button>

          <div v-if="item.followerByCurrentUser">
            <md-button
              v-bind:id="{questionId}"
              v-if="item.followerByCurrentUser.liked"
              @click="dislikeQuestion({questionId})"
            >
              <md-icon style="color:skyblue">thumb_up</md-icon>
            </md-button>
            <md-button v-else v-bind:class="questionId" @click="likeQuestion({questionId})">
              <md-icon>thumb_up</md-icon>
            </md-button>
          </div>
          <div v-else>
            <md-button>
              <md-icon>thumb_up</md-icon>
            </md-button>
          </div>
        </md-card-actions>
      </div>
      <md-divider></md-divider>
      <div v-if="this.showAnswers">
        <div class="md-layout md-gutter md-alignment-center" v-for="item in answerList" :key="item">
          <div
            class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
          >
            <md-divider style="width:106%"></md-divider>
            <div class="md-title" style="float: left; padding-top:2%;padding-left:2%;">Answer</div>
          </div>
          <div
            class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
          >
            <md-divider></md-divider>
            <div
              class="md-title"
              style="float: right;padding-top:2%;padding-right:2%;float: right;font-size:115%"
            >Posted on : {{item.createDate}}</div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div
              class="md-layout-item md-large-size-95 md-medium-size-95 md-small-size-50 md-xsmall-size-100"
            >
              <div
                class="md-title"
                style="float: left; text-align:left;font-size:120%;padding-left:1.5%;padding-top:1.5%"
              >{{item.answerDesc}}</div>
            </div>

            <div
              class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              style="padding-right:2.5%"
            >
              <div v-if="item.answerFeedbackByCurrentUser">
                <md-card-actions>
                  <div style="width:100%;float:left;padding-left:1.5%">
                    <span
                      style="text-transform-lowercase;float:left;"
                    >{{item.noOfLikes}} likes {{item.noOfDislikes}} dislikes</span>
                  </div>
                  <md-button
                    @click="item.answerFeedbackByCurrentUser.liked = !item.answerFeedbackByCurrentUser.liked"
                  >
                    <md-icon v-if="item.answerFeedbackByCurrentUser.liked == false">thumb_up</md-icon>
                    <md-icon v-else style="color:blue">thumb_up</md-icon>
                  </md-button>
                  <md-button
                    @click="item.answerFeedbackByCurrentUser.liked = !item.answerFeedbackByCurrentUser.liked"
                  >
                    <md-icon v-if="item.answerFeedbackByCurrentUser.liked == true">thumb_down</md-icon>
                    <md-icon v-else style="color:blue">thumb_down</md-icon>
                  </md-button>
                </md-card-actions>
              </div>
              <div v-else>
                <md-card-actions>
                  <div style="width:100%;float:left;padding-left:1.5%">
                    <span
                      style="text-transform-lowercase;float:left;"
                    >{{item.noOfLikes}} likes {{item.noOfDislikes}} dislikes</span>
                  </div>
                  <md-button>
                    <md-icon>thumb_up</md-icon>
                  </md-button>
                  <md-button>
                    <md-icon>thumb_down</md-icon>
                  </md-button>
                </md-card-actions>
              </div>
            </div>
          </div>
        </div>
      </div>
    </md-card>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Post your answer here :</md-dialog-title>
      <div style="padding:10px">
        <md-field>
          <label>Textarea</label>
          <md-textarea v-model="answer" required></md-textarea>
          <span class="md-helper-text">Write your answer here.</span>
          <span class="md-error">There is an error</span>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="cancelPostAnswer()">Close</md-button>
        <md-button class="md-primary" @click="postAnswer()">Post</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-snackbar
      :md-position="position"
      :md-active.sync="showSuccessSnackBar"
    >The answer posted successfully!</md-snackbar>
    <md-snackbar
      :md-position="position"
      :md-active.sync="showFailureSnackBar"
    >Error occured, Unable to post answer</md-snackbar>
    <md-snackbar :md-position="position" :md-active.sync="showInvalidBar">Invalid answer.</md-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
export default {
  data: () => ({
    showDialog: false,
    answer: null,
    showSuccessSnackBar: false,
    showFailureSnackBar: false,
    showInvalidBar: false,
    showAnswers: false,
    following: false,
    follow: true,
  }),
  methods: {
    likeQuestion(questionId) {
      questionId = questionId["questionId"];
      alert("like question" + questionId);
    },
    dislikeQuestion(questionId) {
      questionId = questionId["questionId"];
      alert("dislike question" + questionId);
    },
    toggleAnswers() {
      this.showAnswers = !this.showAnswers;
    },
    actionLike() {
      this.$emit("actionLike");
    },
    answerTheQuestion(questionId) {
      questionId = questionId["questionId"];
      console.log(questionId);
      this.showDialog = true;
    },
    postAnswer() {
      if (this.answer.trim().length == 0) {
        window.setTimeout(() => {
          this.showInvalidBar = true;
        }, 1500);
        return;
      }
      var moment = require("moment");
      var createDate = moment(new Date()).format("yyyy-MM-DD");
      const data = {
        userId: localStorage.getItem("questauserId"),
        questionId: this.questionId,
        answerDesc: this.answer,
        createDate: createDate,
      };
      var config = {
        method: "post",
        url: "/createanswer",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: data,
      };
      axios(config)
        .then((response) => {
          var result = actions.successQuestionPost(
            response.data.code,
            response.data.status
          );
          if (result == true) {
            window.setTimeout(() => {
              this.showSuccessSnackBar = true;
            }, 1500);
            this.$emit("actionReload");
          } else {
            window.setTimeout(() => {
              this.showFailureSnackBar = true;
            }, 1500);
          }
        })
        .catch((error) => {
          window.setTimeout(() => {
            this.showFailureSnackBar = true;
          }, 1500);
          actions.errorQuestionPost(
            error.response.data.code,
            error.response.data.status,
            this.$router,
            this.$swal
          );
        });
      this.showDialog = false;
    },
    cancelPostAnswer() {
      this.showDialog = false;
      this.answer = "";
    },
    followTheQuestion(questionId) {
      questionId = questionId["questionId"];
      console.log(questionId);
      this.follow = !this.follow;
      this.following = !this.following;
      // const data = {
      //   userId: localStorage.getItem("questauserId"),
      //   questionId: this.questionId,
      // };
      // var config = {
      //   method: "post",
      //   url: "/createfollower",
      //   headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
      //   data: data,
      // };
      // axios(config)
      //   .then((response) => {
      //     var result = actions.successQuestionPost(
      //       response.data.code,
      //       response.data.status
      //     );
      //     if (result == true) {
      //       window.setTimeout(() => {
      //         // this.showSuccessSnackBar = true;
      //         // TODO show following button
      //       }, 1500);
      //       // this.$emit("actionReload");
      //     } else {
      //       window.setTimeout(() => {
      //         // this.showFailureSnackBar = true;
      //         console.log("failure");
      //       }, 1500);
      //     }
      //   })
      //   .catch((error) => {
      //     window.setTimeout(() => {
      //       console.log("failure");
      //     }, 1500);
      //     actions.errorQuestionPost(
      //       error.response.data.code,
      //       error.response.data.status,
      //       this.$router,
      //       this.$swal
      //     );
      //   });
    },
    unfollowTheQuestion(questionId) {
      questionId = questionId["questionId"];
      console.log(questionId);
      this.follow = !this.follow;
      this.following = !this.following;
    },
  },
  props: {
    item: Object,
    subject: String,
    topic: String,
    dateOfPosted: String,
    questionDesc: String,
    answerList: Object,
    questionId: Number,
    noOfAnswers: Number,
    noOfLikes: Number,
    noOfFollowers: Number,
    questionLiked: Boolean,
  },
};
</script>
<style scoped>
.md-dialog ::v-deep .md-dialog-container {
  width: 50%;
}
</style>