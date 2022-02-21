<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar
        class="md-large md-dense"
        :style="{
          'background-image':
            'url(https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-texture-geometric-black-metal-gradient-image_17809.jpg)',
          color: textColor,
        }"
      >
        <div class="md-toolbar-row">
          <div class="mdl-grid" style="width: 100%; padding-left: 10px">
            <div class="mdl-cell mdl-cell--7-col">
              <div class="md-toolbar-section-start">
                <img
                  src="@/assets/images/quortex.png"
                  width="170"
                  alt="Quortex"
                />                
              </div>
            </div>
            <div class="mdl-cell mdl-cell--5-col" v-if="!admin">
              <h6 style="float: left; padding-right: 3%">
                Level {{ this.userProgressLevel.level }}
              </h6>
              <div style="padding: 1.5%">
                <LevelProgressBar :level="this.progressLevelInPercentage" />
              </div>
            </div>
          </div>
          <div class="md-toolbar-section-end">
            <md-menu md-direction="bottom-start">
              <md-button class="vert_btn" md-menu-trigger>
                <md-icon style="color: white" class="rotating_vert"
                  >more_vert</md-icon
                >
              </md-button>
              <md-menu-content>
                <md-menu-item @click="ModifyProfileDialog()" v-if="!admin"
                  >Modify Profile</md-menu-item
                >
                <md-menu-item @click="logout()">Sign out</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
        
        <div v-if="admin" style="padding-left: 2%">
          <md-button
            style="border-bottom: 3px solid white"
            :style="{ color: textColor }"
          >
            Reported
          </md-button>
        </div>
        <div v-else style="padding-left: 2%">
          <md-button
            style="border-bottom: 3px solid white"
            v-if="ifHome"
            :style="{ color: textColor }"
            >Home</md-button
          >
          <md-button
            :style="{ color: textColor }"
            v-else
            @click="moveToHomePage()"
            >Home</md-button
          >
          <md-button
            :style="{ color: textColor }"
            style="border-bottom: 3px solid white"
            v-if="ifFollowing"
            >Following</md-button
          >
          <md-button
            :style="{ color: textColor }"
            v-else
            @click="moveToFollowingPage()"
            >Following</md-button
          >

          <span>
            <md-button
              :style="{ color: textColor }"
              style="border-bottom: 3px solid white"
              v-if="ifAnsweredByUser"
              >Answered</md-button
            >
            <md-button
              :style="{ color: textColor }"
              v-else
              @click="moveToAnsweredPage()"
              >Answered</md-button
            >
          </span>

          <md-button
            :style="{ color: textColor }"
            style="border-bottom: 3px solid white"
            v-if="ifChallenge"
            >Challenge</md-button
          >
          <md-button
            :style="{ color: textColor }"
            v-else
            @click="moveToChallengePage()"
            >Challenge</md-button
          >
        </div>
      </md-app-toolbar>

      <md-app-content
        v-if="!admin"
        v-bind:style="{
          backgroundColor: this.backgroundColor,
        }"
      >
        <HomePage v-if="ifHome" />
        <Following v-if="ifFollowing" />
        <AnsweredByUser v-if="ifAnsweredByUser" />        
        <ChallengePage v-if="ifChallenge" />
      </md-app-content>
      <md-app-content v-else>
        <ReportedQuestionsForAdmin />
      </md-app-content>
    </md-app>
    <md-dialog :md-active.sync="showProfileDialog">
      <ModifyProfile v-on:closeModifyProfile="closeModifyProfile" />
    </md-dialog>
  </div>
</template>

<script>
import HomePage from "@/components/HomePage.vue";
import LevelProgressBar from "@/components/LevelProgressBar.vue";
import ModifyProfile from "@/components/ModifyProfile.vue";
import Following from "@/components/Following.vue";
import AnsweredByUser from "@/components/AnsweredByUser.vue";
import ChallengePage from "@/components/ChallengePage.vue";
import ReportedQuestionsForAdmin from "@/components/ReportedQuestionsForAdmin.vue";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import cryptoUtil from "@/common/cryptoUtil.js";
import constants from "@/common/constants.js";
export default {
  name: "Home",
  beforeMount() {    
    utilities.awakeAPIGatewayAndBackEndHeroku();
    this.admin = utilities.getUserType(this.$router, this.$swal) == "ADMIN";
    this.userProgressLevel = JSON.parse(
      cryptoUtil.getItem("userProgressLevel", this.$router)
    ) || {
      level: 1,
      currentLevelTime: 0,
      currentTotalLevelTime: 0,
      totalSpendTimeByUser: 0,
    };
    this.progressLevelInPercentage =
      (this.userProgressLevel.currentLevelTime * 100) /
      this.userProgressLevel.currentTotalLevelTime;
  },
  data: () => ({
    backgroundColor: constants.getGeneralBackgroundColor(),
    textColor: "white",
    admin: false,
    menuVisible: false,
    ifHome: true,
    ifFollowing: false,
    ifAnsweredByUser: false,
    ifAnswerByUser: false,
    ifChallenge: false,    
    showProfileDialog: false,
    form: {
      firstName: null,
      lastName: null,
      gender: null,
      age: null,
      email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  components: {
    ChallengePage,    
    LevelProgressBar,
    ReportedQuestionsForAdmin,

    HomePage,
    Following,
    AnsweredByUser,    
    ModifyProfile,
  },
  methods: {
    closeModifyProfile() {
      this.showProfileDialog = false;
    },
    moveToHomePage() {
      this.ifHome = true;
      this.ifFollowing = false;
      this.ifAnsweredByUser = false;
      this.ifAnswerByUser = false;
      this.ifChallenge = false;
    },
    moveToFollowingPage() {
      this.ifHome = false;
      this.ifFollowing = true;
      this.ifAnsweredByUser = false;
      this.ifAnswerByUser = false;
      this.ifChallenge = false;
    },
    moveToAnsweredPage() {
      this.ifHome = false;
      this.ifFollowing = false;
      this.ifAnsweredByUser = true;
      this.ifAnswerByUser = false;
      this.ifChallenge = false;
    },    
    moveToChallengePage() {
      this.ifHome = false;
      this.ifFollowing = false;
      this.ifAnsweredByUser = false;
      this.ifAnswerByUser = false;
      this.ifChallenge = true;
    },
    logout() {
      actions.fireLoggedOut(this.$swal, this.$router);
    },
    ModifyProfileDialog() {
      this.menuVisible = false;
      this.showProfileDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
@import "https://code.getmdl.io/1.3.0/material.min.css";
@import "../styles/welcome.css";
@import "../styles/questioncard.css";
.md-app {
  max-height: 100%;
  border: 1px solid rgba(#000, 0.12);
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.md-dialog ::v-deep .md-dialog-container {
  border-radius: 0.5em;
  max-height: 900px;
  background-color: transparent;
}
.vert_btn:hover .rotating_vert {  
  transition-property: all;
  transition-duration: 0.7s;
}
.rotating_vert {
  transition-property: all;
  transition-duration: 0.7s;
}
.rotating_vert:hover {  
  transition-property: all;
  transition-duration: 0.8s;
}
</style>
