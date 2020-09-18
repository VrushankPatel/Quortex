<template>
  <div>
    <md-card class="qacard">
      <md-card-header style="width: 100%;float: left">
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100"></div>
        </div>

        <div class="md-layout md-gutter md-alignment-center">
          <div
            class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
          >
            <div class="md-title" style="float: left;">topic : {{topic}}</div>
          </div>
          <div
            class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
          >
            <div class="md-title" style="float: right;">subject : {{subject}}</div>
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
          <div class="md-title" style="float: left; text-align:left;font-size:120%">{{questionDesc}}</div>
        </div>
      </div>
      <md-card-actions>
        <md-button>Answer</md-button>
        <md-button>Follow</md-button>
        <md-button>
          <md-icon>thumb_up</md-icon>
        </md-button>
      </md-card-actions>
      <md-divider></md-divider>
      <div class="md-layout md-gutter md-alignment-center" v-for="item in answerList" :key="item">
        <div
          class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
        >
          <div class="md-title" style="float: left; padding-top:2%;padding-left:2%;">Answer</div>
        </div>
        <div
          class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50"
        >
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
    </md-card>
  </div>
</template>

<script>
export default {
  methods: {
    actionLike() {
      this.$emit("actionLike");
    },
  },
  props: {
    subject: String,
    topic: String,
    dateOfPosted: String,
    questionDesc: String,
    answerList: String,
  },
};
</script>