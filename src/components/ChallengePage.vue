<template>
  <div style="min-height: 650px">
    <div>
      <md-card
        class="md-layout-item md-size-95 md-small-size-95 customcard"
        v-for="item in users"
        :key="item"
      >
        <h4 style="float: left; font-weight: bolder; padding-left: 2%">
          <md-icon>person</md-icon> {{ item.nickName }}
        </h4>
        <div
          style="float: right"
          class="mdl-cell mdl-cell--5-col"
          v-if="!admin"
        >
          <h6 style="float: left; padding-right: 3%">
            Level {{ item.userProgressLevel.level }}
          </h6>
          <div style="padding: 1.5%">
            <LevelProgressBar
              :level="
                (item.userProgressLevel.currentLevelTime * 100) /
                item.userProgressLevel.currentTotalLevelTime
              "
            />
          </div>
          <div
            style="float: right; padding-right: 7%"
            title="User's contributed time for answering questions."
          >
            Total time spent :
            {{ getTimeSpent(item.userProgressLevel.totalSpendTimeByUser) }}
          </div>
        </div>
      </md-card>
    </div>
    <div v-if="showLoader">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      <h4>Loading Data</h4>
    </div>
    <div v-if="dataNotFound">
      <DataNotFound message="Data is not available." />
    </div>
  </div>
</template>

<script>
// import Loader from "@/components/Loader.vue";
import DataNotFound from "@/components/DataNotFound.vue";
import LevelProgressBar from "@/components/LevelProgressBar.vue";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import constants from "@/common/constants.js";
export default {
  name: "HomePage",
  components: {
    DataNotFound,
    LevelProgressBar,
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getTimeSpent(timeSpent) {
      return utilities.secondsToHms(timeSpent);
    },
    getData() {
      var config = {
        method: "post",
        url: constants.baseUrl() + "/findtoptenusers",
        headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
      };
      utilities.sendRequest(
        config,
        (response) => {
          if (response.data.status == 404) {
            this.showLoader = false;
            this.dataNotFound = true;
            return;
          }
          this.users = response.data;
          this.showLoader = false;
        },
        (error) => {
          if (
            error.response.data.code == 401 ||
            error.response.data.code == 555
          ) {
            actions.fireLoggedOut(this.$swal, this.$router);
            return;
          }
          this.showLoader = false;
          this.dataNotFound = true;
        }
      );
    },
  },
  data: () => ({
    users: null,
    showLoader: true,
    dataNotFound: false,
  }),
};
</script>

<style scoped>
.md-dialog ::v-deep .md-dialog-container {
  width: 40%;
}
.questtext {
  cursor: pointer;
}
.customcard {
  border: 1px solid lightgrey;
}
</style>
