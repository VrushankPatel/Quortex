<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button
              class="md-icon-button"
              @click="menuVisible = !menuVisible"
            >
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">Questa</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-menu md-direction="bottom-start">
              <md-button md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="EditProfileDialog()"
                  >Edit Profile</md-menu-item
                >
                <md-menu-item @click="logout()">Logout</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
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
            <!-- <md-tab
              id="tab-questions"
              md-label="Q/A"
              @click="moveToQuestionsPage()"
            ></md-tab> -->
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <HomePageDrawer v-on:editprofile="EditProfileDialog()" />
      </md-app-drawer>

      <md-app-content>
        <HomePage v-if="ifHome" />
        <Following v-if="ifFollowing" />
        <AnsweredByUser v-if="ifAnsweredByUser" />
        <!-- <Questions v-if="ifQuestions" /> -->
      </md-app-content>
    </md-app>
    <md-dialog :md-active.sync="showProfileDialog">
      <EditProfileField v-on:editProfile="EditProfileDialog()" />
    </md-dialog>
  </div>
</template>

<script>
import HomePageDrawer from "@/components/HomePageDrawer.vue";
import HomePage from "@/components/HomePage.vue";
import EditProfileField from "@/components/EditProfileField.vue";
import Following from "@/components/Following.vue";
import AnsweredByUser from "@/components/AnsweredByUser.vue";
// import Questions from "@/components/Questions.vue";
import actions from "@/common/actions.js";
export default {
  name: "Home",
  beforeMount() {
    document.body.style.backgroundColor = "white";
  },
  data: () => ({
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
    HomePageDrawer,
    HomePage,
    Following,
    AnsweredByUser,
    // Questions,
    EditProfileField,
  },
  methods: {
    temp() {
      this.ifHome = false;
    },
    moveToHomePage() {
      this.ifHome = true;
      this.ifFollowing = false;
      this.ifAnsweredByUser = false;
      //   this.ifQuestions = false;
    },
    moveToFollowingPage() {
      this.ifHome = false;
      this.ifFollowing = true;
      this.ifAnsweredByUser = false;
      //   this.ifQuestions = false;
    },
    moveToAnswersPage() {
      this.ifHome = false;
      this.ifFollowing = false;
      this.ifAnsweredByUser = true;
      //   this.ifQuestions = false;
    },
    // moveToQuestionsPage() {
    //   this.ifHome = false;
    //   this.ifFollowing = false;
    //   this.ifAnsweredByUser = false;
    //   this.ifQuestions = true;
    // },
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
</style>
