<template>
  <div
    id="welcomecomponent"
    class="mdl-layout mdl-js-layout mdl-layout--fixed-header"
  >
    <div
      class="android-header mdl-layout__header mdl-layout__header--waterfall"
    >
      <div class="mdl-layout__header-row">
        <span class="android-title mdl-layout-title">
          <img
            class="android-logo-image"
            src="@/assets/images/quortex-logo.png"
          />
        </span>
        <div class="android-header-spacer mdl-layout-spacer"></div>
        <div class="android-navigation-container">
          <nav class="android-navigation mdl-navigation">
            <a
              class="mdl-navigation__link mdl-typography--text-uppercase"
              id="loginbtn"
              href="/signin/"
              >Login</a
            >
            <a
              class="mdl-navigation__link mdl-typography--text-uppercase"
              id="signupbtn"
              href="/signup/"
              >Sign up</a
            >
          </nav>
        </div>
        <span class="android-mobile-title mdl-layout-title">
          <img
            class="android-logo-image"
            src="@/assets/images/quortex-logo.png"
          />
        </span>
      </div>
    </div>

    <div class="android-drawer mdl-layout__drawer">
      <span class="mdl-layout-title">
        <h1 id="drawerlogo">Quortex</h1>
      </span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/signin/">Login</a>
        <a class="mdl-navigation__link" href="/signup/">Sign up</a>
      </nav>
    </div>
    <div class="android-content mdl-layout__content">
      <a name="top"></a>
      <div class="android-be-together-section mdl-typography--text-center">
        <a>
          <button
            class="android-fab mdl-button mdl-button--colored mdl-js-button mdl-button--fab mdl-js-ripple-effect"
          >
            <i class="material-icons">expand_more</i>
          </button>
        </a>
      </div>
      <div class="android-wear-section" id="screens2">
        <div class="android-wear-band">
          <div class="android-wear-band-text">
            <div class="mdl-typography--display-2 mdl-typography--font-thin">
              Ask Questions, get answered
            </div>
            <p class="mdl-typography--headline mdl-typography--font-thin">
              Quortex works perfectly with your favourite device to manage all
              your doubts and questions.
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import utilities from "@/common/utilities.js";
export default {
  name: "WelcomePage",
  beforeMount() {
    this.$swal.fire({
      icon: "info",
      title: "Notice",
      text:
        "Quortex and it's services are hosted on free deployment dynos of heroku which usually sleep after 30 minutes of inactivity. So, first response might be slow because it'll take around 20 seconds to wake up all the services on heroku.",
    });
  },
  mounted: function () {
    utilities.awakeAPIGatewayAndBackEndHeroku();
    utilities.updateFirebaseTimeStamp();
    Vue.loadScript("https://code.getmdl.io/1.3.0/material.min.js");
  },
};
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
@import "https://code.getmdl.io/1.3.0/material.min.css";
@import "../styles/welcome.css";
#view-source {
  position: fixed;
  display: block;
  right: 0;
  bottom: 0;
  margin-right: 40px;
  margin-bottom: 40px;
  z-index: 900;
}
#loginbtn,
#signupbtn {
  color: grey;
  text-decoration: none;
}
#drawerlogo {
  color: white;
  float: center;
  padding-top: 35%;
  padding-right: 20%;
  font-size: 200%;
}
</style>
