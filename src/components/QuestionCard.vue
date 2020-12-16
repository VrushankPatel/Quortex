<template>
  <div style="padding-top: 1%">
    <md-card class="qacard" style="border: none">
      <div style="color: white; background-color: #3d3d3d">
        <!-- #4b4b4b try this for above background color-->
        <md-card-header style="width: 100%; float: left">
          <div class="md-layout md-gutter md-alignment-center">
            <div
              class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100"
            ></div>
          </div>

          <div class="md-layout md-gutter md-alignment-center">
            <div
              class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30"
            >
              <div class="md-title" style="float: left">
                <span class="topicAndSubject"
                  ><md-icon style="color: white">person</md-icon> @{{
                    nickName
                  }}</span
                >
              </div>
            </div>
            <div
              class="md-layout-item md-large-size-70 md-medium-size-70 md-small-size-70 md-xsmall-size-70"
            >
              <div class="md-title" style="float: right">
                <span class="topicAndSubject">{{
                  this.getSubjectFromCode({ subject })
                }}</span>
                :
                <span class="topicAndSubject">{{ topic }}</span>
              </div>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div
              class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
            >
              <div class="md-title" style="float: right; font-size: 115%">
                {{ getFormattedDate(dateOfPosted) }}
              </div>
            </div>
          </div>
        </md-card-header>
        <div class="md-layout md-gutter md-alignment-center">
          <div
            class="md-layout-item md-large-size-95 md-medium-size-95 md-small-size-50 md-xsmall-size-95"
          >
            <div
              class="md-title"
              style="
                float: left;
                text-align: left;
                font-size: 120%;
                padding-left: 2%;
              "
            >
              <div v-for="item in questionDesc.split('\n')" :key="item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <md-divider></md-divider>
        <md-card-actions>
          <div style="width: 100%; float: left">
            <md-button
              style="color: white; float: left"
              @click="toggleAnswers()"
            >
              <md-badge
                class="md-primary"
                :md-content="noOfAnswers"
                v-if="!admin"
              >
                <span style="padding-top: 9%">Show Comments.......</span>
              </md-badge>
              <span v-else style="padding-top: 9%">Show Comments</span>
            </md-button>
          </div>
          <div style="width: 100%; float: left; padding-left: 1.5%">
            <span style="text-transform-lowercase;float:left;">
              <span v-if="noOfLikes">{{ noOfLikes }}</span>
              <span v-else>0</span>
              Likes <span v-if="noOfFollowers">{{ noOfFollowers }}</span>
              <span v-else>0</span> Followers
            </span>
          </div>
          <md-button
            v-if="!admin"
            style="color: white"
            @click="answerTheQuestion({ questionId }, { answerList })"
            >Comment</md-button
          >
          <div v-if="item.followerByCurrentUser && !admin">
            <md-button
              style="color: white"
              v-if="!item.followerByCurrentUser.followed == true"
              @click="
                noOfFollowers++;
                item.followerByCurrentUser.followed = !item
                  .followerByCurrentUser.followed;
                followUnfollowQuestion({ questionId }, true);
              "
              >Follow</md-button
            >
            <md-button
              style="color: white"
              v-else
              @click="
                noOfFollowers--;
                item.followerByCurrentUser.followed = !item
                  .followerByCurrentUser.followed;
                followUnfollowQuestion({ questionId }, false);
              "
              >Following</md-button
            >
          </div>
          <div v-else>
            <md-button
              v-if="!admin"
              style="color: white"
              @click="
                noOfFollowers++;
                item['followerByCurrentUser'] = { followed: true };
                followUnfollowQuestion({ questionId }, true);
              "
              >Follow</md-button
            >
          </div>

          <div v-if="item.questionFeedbackByCurrentUser && !admin">
            <md-button
              v-bind:id="{ questionId }"
              v-if="item.questionFeedbackByCurrentUser.liked == true"
              @click="
                noOfLikes--;
                item.questionFeedbackByCurrentUser.liked = !item
                  .questionFeedbackByCurrentUser.liked;
                dislikeQuestion({ questionId });
              "
            >
              <md-icon style="color: skyblue">thumb_up</md-icon>
            </md-button>
            <md-button
              v-else
              v-bind:class="questionId"
              @click="
                noOfLikes++;
                item.questionFeedbackByCurrentUser.liked = !item
                  .questionFeedbackByCurrentUser.liked;
                likeQuestion({ questionId });
              "
            >
              <md-icon>thumb_up</md-icon>
            </md-button>
          </div>
          <div v-else>
            <md-button
              v-if="!admin"
              @click="
                noOfLikes++;
                likeQuestion({ questionId });
                item['questionFeedbackByCurrentUser'] = { liked: true };
              "
            >
              <md-icon>thumb_up</md-icon>
            </md-button>
          </div>
        </md-card-actions>
      </div>
      <!-- <md-divider></md-divider> -->
      <div v-if="this.showAnswers">
        <div
          class="md-layout md-gutter md-alignment-center"
          v-for="item in answerList"
          :key="item"
        >
          <md-dialog :md-active.sync="showReportDialog">
            <md-dialog-title>Report :</md-dialog-title>
            <div style="padding: 10px">
              <md-field>
                <label>Report</label>
                <md-textarea v-model="reportDesc" required></md-textarea>
                <span class="md-helper-text"
                  >Write your report description here.</span
                >
                <span class="md-error"
                  >report description can not be empty.</span
                >
              </md-field>
            </div>
            <md-dialog-actions>
              <md-button class="md-primary" @click="closeReport()"
                >Close</md-button
              >
              <md-button class="md-primary" @click="postReport(reportDesc)"
                >Report</md-button
              >
            </md-dialog-actions>
          </md-dialog>
          <div
            class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
          >
            <md-divider style="width: 106%"></md-divider>
            <div
              class="md-title"
              style="float: left; padding-top: 2%; padding-left: 4%"
            >
              <span class="topicAndSubject">
                <md-icon>person</md-icon>
                {{ item.nickName }}
              </span>
            </div>
          </div>
          <div
            class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
          >
            <md-divider></md-divider>
            <div
              class="md-title"
              style="
                float: right;
                padding-top: 2%;
                padding-right: 2%;
                float: right;
                font-size: 115%;
              "
            >
              {{ getFormattedDate(item.createDate) }}
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div
              class="md-layout-item md-large-size-95 md-medium-size-95 md-small-size-50 md-xsmall-size-100"
            >
              <div
                class="md-title"
                style="
                  float: left;
                  text-align: left;
                  font-size: 120%;
                  padding-left: 2.5%;
                  padding-top: 1.5%;
                "
              >
                <div v-for="line in item.answerDesc.split('\n')" :key="line">
                  {{ line }}
                </div>
              </div>
            </div>

            <div
              class="md-layout-item md-large-size-95 md-medium-size-95 md-small-size-50 md-xsmall-size-100"
            >
              <div
                v-if="admin"
                class="md-title"
                style="
                  float: left;
                  text-align: left;
                  font-size: 120%;
                  padding-left: 2.5%;
                  padding-top: 2%;
                  color: darkred;
                  font-size: 20px;
                "
              >
                Reported by :
              </div>
            </div>

            <div
              v-for="feedback in item.answerFeedbackList"
              :key="feedback.feedbackId"
              class="md-layout-item md-large-size-95 md-medium-size-95 md-small-size-50 md-xsmall-size-100"
            >
              <div
                v-if="admin"
                class="md-title"
                style="
                  float: left;
                  text-align: left;
                  font-size: 120%;
                  padding-left: 2.5%;
                "
              >
                <span style="font-weight: bold">{{ feedback.nickName }} </span>:
                {{ feedback.reportDesc }}
              </div>
            </div>
            <div
              class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              style="padding-right: 2.5%"
            >
              <div v-if="item.answerFeedbackByCurrentUser">
                <div
                  style="
                    width: 70%;
                    float: left;
                    padding-left: 1.5%;
                    padding-top: 1.5%;
                    padding-bottom: 1%;
                  "
                >
                  <span
                    style="text-transform-lowercase;float:left;padding-left: 2.5%;"
                  >
                    <span v-if="item.noOfLikes >= 0">{{ item.noOfLikes }}</span>
                    <span v-else>0</span> likes
                    <span v-if="item.noOfDislikes >= 0">{{
                      item.noOfDislikes
                    }}</span>
                    <span v-else>0</span> dislikes
                  </span>
                </div>
                <md-card-actions v-if="admin" style="padding-right: 3%">
                  <div
                    v-if="admin"
                    class="md-title"
                    style="float: left; cursor: pointer"
                  >
                    <md-button @click="deleteQuestion(item.answerId)"
                      ><md-icon class="deletebtn">delete</md-icon></md-button
                    >
                  </div>
                </md-card-actions>
                <md-card-actions v-else>
                  <md-button
                    v-if="item.answerFeedbackByCurrentUser.liked == false"
                    @click="
                      item.answerFeedbackByCurrentUser.liked = true;
                      item.noOfLikes++;
                      item.noOfDislikes--;
                      likeAnswer(item.answerId);
                    "
                  >
                    <md-icon>thumb_up</md-icon>
                  </md-button>
                  <md-button
                    v-else
                    @click="item.answerFeedbackByCurrentUser.liked = true"
                  >
                    <md-icon style="color: blue">thumb_up</md-icon>
                  </md-button>
                  <md-button
                    v-if="item.answerFeedbackByCurrentUser.liked == true"
                    @click="
                      item.answerFeedbackByCurrentUser.liked = false;
                      item.noOfLikes--;
                      item.noOfDislikes++;
                      dislikeAnswer(item.answerId);
                    "
                  >
                    <md-icon>thumb_down</md-icon>
                  </md-button>
                  <md-button
                    v-else
                    @click="item.answerFeedbackByCurrentUser.liked = false"
                  >
                    <md-icon style="color: blue">thumb_down</md-icon>
                  </md-button>
                  <md-button
                    title="Report as inappropriate"
                    @click="openReportDialog(item.answerId)"
                  >
                    <md-icon>report</md-icon>
                  </md-button>
                </md-card-actions>
              </div>
              <div v-else>
                <div
                  style="
                    width: 70%;
                    float: left;
                    padding-left: 2.5%;
                    padding-top: 1.5%;
                    padding-bottom: 1%;
                  "
                >
                  <span
                    style="text-transform-lowercase;float:left;padding-left: 2.5%;"
                    >{{ item.noOfLikes }} likes
                    {{ item.noOfDislikes }} dislikes</span
                  >
                </div>
                <md-card-actions v-if="admin" style="padding-right: 3%">
                  <div
                    v-if="admin"
                    class="md-title"
                    style="float: left; cursor: pointer"
                  >
                    <md-button @click="deleteQuestion(item.answerId)"
                      ><md-icon class="deletebtn">delete</md-icon></md-button
                    >
                  </div>
                </md-card-actions>
                <md-card-actions v-else>
                  <md-button
                    @click="
                      item.answerFeedbackByCurrentUser = {
                        liked: true,
                        unliked: false,
                      };
                      item.noOfLikes++;
                      likeAnswer(item.answerId);
                    "
                  >
                    <md-icon>thumb_up</md-icon>
                  </md-button>
                  <md-button
                    @click="
                      item.answerFeedbackByCurrentUser = {
                        liked: false,
                        unliked: true,
                      };
                      item.noOfDislikes++;
                      dislikeAnswer(item.answerId);
                    "
                  >
                    <md-icon>thumb_down</md-icon>
                  </md-button>
                  <md-button
                    title="Report as inappropriate"
                    @click="openReportDialog(item.answerId)"
                  >
                    <md-icon>report</md-icon>
                  </md-button>
                </md-card-actions>
              </div>
            </div>
          </div>
        </div>
      </div>
    </md-card>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Write your comment here :</md-dialog-title>
      <div style="padding: 10px">
        <md-field>
          <label>Comment</label>
          <md-textarea
            v-model="answer"
            @focus="startTimer()"
            required
          ></md-textarea>
          <span class="md-helper-text">Write your comment here.</span>
          <span class="md-error">Comment can not be empty.</span>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="cancelPostAnswer()"
          >Close</md-button
        >
        <md-button class="md-primary" @click="postAnswer()">Post</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-snackbar :md-position="position" :md-active.sync="showSuccessSnackBar"
      >Your answer submitted successfully!</md-snackbar
    >
    <md-snackbar
      :md-position="position"
      :md-active.sync="showReportSuccessSnackBar"
      >Answer is reported successfully!</md-snackbar
    >
    <md-snackbar
      :md-position="position"
      :md-active.sync="showReportFailureSnackBar"
      >Error occured! Unable to report answer</md-snackbar
    >
    <md-snackbar :md-position="position" :md-active.sync="showFailureSnackBar"
      >Error occured! Unable to submit answer</md-snackbar
    >
    <md-snackbar :md-position="position" :md-active.sync="showInvalidBar"
      >Invalid answer.</md-snackbar
    >
  </div>
</template>

<script>
import axios from "axios";
import cryptoUtil from "@/common/cryptoUtil.js";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import constants from "@/common/constants.js";

export default {
  data: () => ({
    showReportDialog: false,
    reportDesc: "",
    showDialog: false,
    answer: null,
    showSuccessSnackBar: false,
    showFailureSnackBar: false,
    showReportSuccessSnackBar: false,
    showInvalidBar: false,
    showAnswers: false,
    showReportFailureSnackBar: false,
    subjectByCodes: constants.subjectByCodes,
    startingTime: 0,
    endingTime: 0,
    admin: utilities.getUserType() == "ADMIN",
    currentAnswerId: 0,
  }),
  methods: {
    deleteQuestion(answerId) {
      var config = {
        method: "post",
        url: constants.baseUrl() + "/deleteanswer",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: {
          answerId: answerId,
        },
      };
      console.log(config);

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response));
          location.reload();
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          alert("unable to delete answer..");
        });
    },
    getFormattedDate(dateString) {
      var date = dateString.split("-");
      return (
        constants.months[parseInt(date[1])] + " " + date[2] + ", " + date[0]
      );
    },
    closeReport() {
      this.showReportDialog = false;
    },
    postReport(reportDesc) {
      var config = {
        method: "post",
        url: constants.baseUrl() + "/createfeedback",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: {
          userId: utilities.getUserId(this.$router),
          answerId: this.currentAnswerId,
          reportDesc: reportDesc,
        },
      };
      console.log(config.data);

      axios(config)
        .then((response) => {
          var result = actions.successQuestionPost(
            response.data.code,
            response.data.status
          );
          if (result == true) {
            window.setTimeout(() => {
              this.showReportSuccessSnackBar = true;
            }, 1500);
          } else {
            console.log(JSON.stringify(response));
            window.setTimeout(() => {
              this.showReportFailureSnackBar = true;
            }, 1500);
          }
          this.showReportDialog = false;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          var result = actions.successQuestionPost(
            error.data.code,
            error.data.status
          );
          console.log(result);
        });
      this.reportDesc = "";
    },
    openReportDialog(id) {
      this.currentAnswerId = id;
      this.showReportDialog = true;
    },
    async startTimer() {
      this.startingTime = new Date().getTime();
    },
    getSubjectFromCode(code) {
      return this.subjectByCodes[code.subject];
    },
    likeAnswer(answerId) {
      this.likeDislikeAnswer(true, answerId);
    },
    dislikeAnswer(answerId) {
      this.likeDislikeAnswer(false, answerId);
    },
    likeDislikeAnswer(like, answerId) {
      var config = {
        method: "post",
        url: constants.baseUrl() + "/createfeedback",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: {
          userId: utilities.getUserId(this.$router),
          answerId: answerId,
          liked: like,
          unliked: !like,
        },
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response));
          var result = actions.successQuestionPost(
            response.data.code,
            response.data.status
          );
          console.log(result);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          var result = actions.successQuestionPost(
            error.data.code,
            error.data.status
          );
          console.log(result);
        });
    },
    likeQuestion(questionId) {
      this.likeDislikeQuestion(questionId, true);
    },
    dislikeQuestion(questionId) {
      this.likeDislikeQuestion(questionId, false);
    },
    toggleAnswers() {
      this.showAnswers = !this.showAnswers;
    },
    actionLike() {
      this.$emit("actionLike");
    },
    answerTheQuestion(questionId, answerList) {
      // var answers = answerList["answerList"];
      // answers = answers.filter((answer) => {
      //   return answer.userId == 302;
      // });
      // this.answer = answers.length == 1 ? answers[0]["answerDesc"] : "";
      console.log(answerList);
      this.answer = "";
      questionId = questionId["questionId"];
      this.showDialog = true;
    },
    postAnswer() {
      this.endingTime = new Date().getTime();
      const timeTaken = Math.floor(
        (this.endingTime - this.startingTime) * 0.001
      );
      if (this.answer.trim().length == 0) {
        this.startTimer();
        window.setTimeout(() => {
          this.showInvalidBar = true;
        }, 1500);
        return;
      }
      var moment = require("moment");
      var createDate = moment(new Date()).format("yyyy-MM-DD");
      const data = {
        userId: utilities.getUserId(this.$router),
        questionId: this.questionId,
        answerDesc: this.answer,
        createDate: createDate,
        timeTaken: timeTaken,
      };
      var config = {
        method: "post",
        url: constants.baseUrl() + "/createanswer",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: data,
      };
      axios(config)
        .then((response) => {
          cryptoUtil.setItem(
            "userProgressLevel",
            JSON.stringify(response.data.userProgressLevel)
          );
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
            console.log(JSON.stringify(response));
            window.setTimeout(() => {
              this.showFailureSnackBar = true;
            }, 1500);
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
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
    followUnfollowQuestion(questionId, follow) {
      questionId = questionId["questionId"];
      const data = {
        userId: utilities.getUserId(this.$router),
        questionId: this.questionId,
        followed: follow,
      };
      var config = {
        method: "post",
        url: constants.baseUrl() + "/createfollower",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: data,
      };
      console.log(config);
      console.log(data);
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.log(error);
          window.setTimeout(() => {
            console.log("failure");
          }, 1500);
        });
    },
    likeDislikeQuestion(questionId, like) {
      questionId = questionId["questionId"];
      const data = {
        userId: utilities.getUserId(this.$router),
        questionId: this.questionId,
        liked: like,
        unliked: !like,
      };
      var config = {
        method: "post",
        url: constants.baseUrl() + "/createquestionfeedback",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
        data: data,
      };
      console.log(config);
      console.log(data);
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.log(error);
          window.setTimeout(() => {
            console.log("failure");
          }, 1500);
        });
    },
  },
  props: {
    item: Object,
    subject: String,
    topic: String,
    nickName: String,
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

.qacard {
  transition-property: all;
  transition-duration: 0.4s;
  background-color: transparent;
}
.qacard:hover {
  transition-property: all;
  transition-duration: 0.4s;
  transform: scale(1.02);
}
.topicAndSubject {
  font-size: 80%;
  font-weight: 550;
}
.deletebtn {
  color: lightgrey;
}
</style>
