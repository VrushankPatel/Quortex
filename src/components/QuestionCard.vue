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
          <md-button style="color:white" @click="answerTheQuestion({questionId})">Answer</md-button>
          <md-button style="color:white">Follow</md-button>
          <md-button>
            <md-icon>thumb_up</md-icon>
          </md-button>
        </md-card-actions>
      </div>
      <md-divider></md-divider>
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
            <div v-if="item.userFeedbackList.length > 0">
              <md-card-actions>
                <md-button
                  @click="item.userFeedbackList[0].liked = !item.userFeedbackList[0].liked"
                >
                  <md-icon v-if="item.userFeedbackList[0].liked == false">thumb_up</md-icon>
                  <md-icon v-else style="color:blue">thumb_up</md-icon>
                </md-button>
                <md-button
                  @click="item.userFeedbackList[0].liked = !item.userFeedbackList[0].liked"
                >
                  <md-icon v-if="item.userFeedbackList[0].liked == true">thumb_down</md-icon>
                  <md-icon v-else style="color:blue">thumb_down</md-icon>
                </md-button>
              </md-card-actions>
            </div>
            <div v-else>
              <md-card-actions>
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
  }),
  methods: {
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
  },
  props: {
    subject: String,
    topic: String,
    dateOfPosted: String,
    questionDesc: String,
    answerList: String,
    questionId: Number,
  },
};
</script>
<style scoped>
.md-dialog ::v-deep .md-dialog-container {
  width: 50%;
}
</style>