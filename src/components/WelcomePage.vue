<template>
  <div id="welcomecomponent" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <div class="android-header mdl-layout__header mdl-layout__header--waterfall">
      <div class="mdl-layout__header-row">
        <span class="android-title mdl-layout-title">
          <img class="android-logo-image" src="@/assets/images/android-logo.png" />
        </span>
        <div class="android-header-spacer mdl-layout-spacer"></div>
        <div class="android-navigation-container">
          <nav class="android-navigation mdl-navigation">
            <a
              class="mdl-navigation__link mdl-typography--text-uppercase"
              id="loginbtn"
              href="/signin/"
            >Login</a>
            <a
              class="mdl-navigation__link mdl-typography--text-uppercase"
              id="signupbtn"
              href="/signup/"
            >Sign up</a>
          </nav>
        </div>
        <span class="android-mobile-title mdl-layout-title">
          <img class="android-logo-image" src="@/assets/images/android-logo.png" />
        </span>
      </div>
    </div>

    <div class="android-drawer mdl-layout__drawer">
      <span class="mdl-layout-title">
        <h1 id="drawerlogo">Questa</h1>
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
            <div
              class="mdl-typography--display-2 mdl-typography--font-thin"
            >Ask Questions, get answered</div>
            <p
              class="mdl-typography--headline mdl-typography--font-thin"
            >Questa works perfectly with your favourite device to manage all your doubts and questions.</p>
            <p></p>
          </div>
        </div>
      </div>
      <footer class="android-footer mdl-mega-footer">
        <div class="mdl-mega-footer--top-section">
          <div class="mdl-mega-footer--right-section">
            <a class="mdl-typography--font-light">
              Back to Top
              <i class="material-icons">expand_less</i>
            </a>
          </div>
        </div>

        <div class="mdl-mega-footer--middle-section">
          <p class="mdl-typography--font-light">
            All these project components are designed based on
            <br />Bootstrap and Google material design lite framework
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "WelcomePage",
  mounted: function () {
    Vue.loadScript("https://code.getmdl.io/1.3.0/material.min.js")
      .then(() => {
        console.log("added gmdl");
      })
      .catch(() => {
        console.log("failed to add gmdl");
      });
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

