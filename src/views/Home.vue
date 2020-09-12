<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">Questa</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-menu md-direction="bottom-start">
              <md-button>
                <md-icon md-menu-trigger>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item>My Item 1</md-menu-item>
                <md-menu-item>My Item 2</md-menu-item>
                <md-menu-item>Logout</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Home" @click="moveToHomePage()"></md-tab>
            <md-tab id="tab-following" md-label="Following" @click="moveToFollowingPage()"></md-tab>
            <md-tab id="tab-answers" md-label="Answers"></md-tab>
            <md-tab id="tab-questions" md-label="Questions"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <HomePageDrawer />
      </md-app-drawer>

      <md-app-content>
        <HomePage v-if="ifHome" />
        <Following v-if="ifFollowing" />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import HomePageDrawer from "@/components/HomePageDrawer.vue";
import HomePage from "@/components/HomePage.vue";
import Following from "@/components/Following.vue";
export default {
  name: "Home",
  data: () => ({
    menuVisible: false,
    ifHome: true,
    ifFollowing: false,
  }),
  components: {
    HomePageDrawer,
    HomePage,
    Following,
  },
  methods: {
    temp() {
      this.ifHome = false;
    },
    moveToHomePage() {
      this.ifHome = true;
      this.ifFollowing = false;
    },
    moveToFollowingPage() {
      this.ifHome = !this.ifHome;
      this.ifFollowing = !this.ifFollowing;
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
</style>