<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar
        class="md-large md-dense"
        :style="{
          'background-image': 'url(https://getmdl.io/assets/header.jpg)',
          color: textColor,
        }"
      >
        <div class="md-toolbar-row">
          <div class="mdl-grid" style="width: 100%; padding-left: 10px">
            <div class="mdl-cell mdl-cell--7-col">
              <div class="md-toolbar-section-start">
                <img
                  src="@/assets/images/questa.png"
                  width="170"
                  alt="Questa"
                />
                <!-- <span
                  class="md-title"
                  :style="{
                    color: textColor,
                    'padding-top': '20px',
                    'font-size': '30px',
                  }"
                  >Questa <span v-if="admin">Admin</span></span
                > -->
              </div>
            </div>
            <div class="mdl-cell mdl-cell--5-col">
              <h6 style="float: left; padding-right: 3%">Level 1</h6>
              <div style="padding: 1.5%"><LevelProgressBar /></div>
            </div>
          </div>
          <!-- <div class="md-toolbar-section-end">
						<md-menu md-direction="bottom-start">
							<md-button class="vert_btn" md-menu-trigger>
								<md-icon class="rotating_vert">more_vert</md-icon>
							</md-button>
							<md-menu-content>
								<md-menu-item @click="EditProfileDialog()" v-if="!admin"
									>Edit Profile</md-menu-item
								>
								<md-menu-item @click="logout()">Logout</md-menu-item>
							</md-menu-content>
						</md-menu>
					</div> -->
        </div>

        <!-- reported questions window  -->
        <div v-if="admin" style="padding-left: 2%">
          <md-button
            style="border-bottom: 3px solid white"
            :style="{ color: textColor }"
          >
            Reported
          </md-button>
        </div>
        <!--  -->
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

          <md-button
            :style="{ color: textColor }"
            style="border-bottom: 3px solid white"
            v-if="ifAnsweredByUser"
            >Commented</md-button
          >
          <md-button
            :style="{ color: textColor }"
            v-else
            @click="moveToAnswersPage()"
            >Commented</md-button
          >

          <md-button :style="{ color: textColor }" @click="EditProfileDialog()"
            >Edit Profile</md-button
          >

          <!-- <md-tabs class="md-primary">
						<md-tab
							id="tab-home"
							md-label="Home"
							@click="moveToHomePage()"
						></md-tab>
						<md-tab
							id="tab-following"
							md-label="Following"
							@click="moveToFollowingPage()"
						></md-tab>
						<md-tab
							id="tab-answers"
							md-label="Answers"
							@click="moveToAnswersPage()"
						></md-tab>
					</md-tabs> -->
        </div>
        <md-button :style="{ color: textColor }" @click="logout()"
          >Sign out</md-button
        >
      </md-app-toolbar>

      <!-- <md-app-drawer v-if="!admin" :md-active.sync="menuVisible">
        <HomePageDrawer v-on:editprofile="EditProfileDialog()" />
      </md-app-drawer> -->

      <md-app-content
        v-if="!admin"
        v-bind:style="{
          backgroundColor: this.backgroundColor,
        }"
      >
        <HomePage v-if="ifHome" />
        <Following v-if="ifFollowing" />
        <AnsweredByUser v-if="ifAnsweredByUser" />
        <!-- <Questions v-if="ifQuestions" /> -->
      </md-app-content>
      <md-app-content v-else>
        <ReportedQuestionsForAdmin />
      </md-app-content>
    </md-app>
    <md-dialog :md-active.sync="showProfileDialog">
      <EditProfileField v-on:closeEditProfile="closeEditProfile" />
    </md-dialog>
  </div>
</template>

<script>
// import HomePageDrawer from "@/components/HomePageDrawer.vue";
import HomePage from "@/components/HomePage.vue";
import LevelProgressBar from "@/components/LevelProgressBar.vue";
import EditProfileField from "@/components/EditProfileField.vue";
import Following from "@/components/Following.vue";
import AnsweredByUser from "@/components/AnsweredByUser.vue";
import ReportedQuestionsForAdmin from "@/components/ReportedQuestionsForAdmin.vue";
// import Questions from "@/components/Questions.vue";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import properties from "@/common/properties.js";
export default {
  name: "Home",
  beforeMount() {
    document.body.style.backgroundColor = "white";
    this.admin = utilities.getUserType(this.$router, this.$swal) == "ADMIN";
  },
  data: () => ({
    backgroundColor: properties.getGeneralBackgroundColor(),
    textColor: "white",
    admin: false, //  true for admin.
    menuVisible: false,
    ifHome: true,
    ifFollowing: false,
    ifAnsweredByUser: false,
    // ifQuestions: false,
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
    LevelProgressBar,
    ReportedQuestionsForAdmin,
    // HomePageDrawer,
    HomePage,
    Following,
    AnsweredByUser,
    // Questions,
    EditProfileField,
  },
  methods: {
    closeEditProfile() {
      this.showProfileDialog = false;
    },
    moveToHomePage() {
      this.ifHome = true;
      this.ifFollowing = false;
      this.ifAnsweredByUser = false;
    },
    moveToFollowingPage() {
      this.ifHome = false;
      this.ifFollowing = true;
      this.ifAnsweredByUser = false;
    },
    moveToAnswersPage() {
      this.ifHome = false;
      this.ifFollowing = false;
      this.ifAnsweredByUser = true;
    },
    logout() {
      actions.fireLoggedOut(this.$swal, this.$router);
    },
    EditProfileDialog() {
      this.menuVisible = false;
      this.showProfileDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
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
  // transform: rotate(360deg);
  transition-property: all;
  transition-duration: 0.7s;
}
.rotating_vert {
  transition-property: all;
  transition-duration: 0.7s;
}
.rotating_vert:hover {
  //   transform: rotate(360deg);
  transition-property: all;
  transition-duration: 0.8s;
}
</style>
