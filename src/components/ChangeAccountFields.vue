<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <EditProfileField />
    </md-dialog>
  </div>
</template>
<script>
import EditProfileField from "@/components/EditProfileField.vue";
export default {
  components: {
    EditProfileField,
  },
  data: () => ({
    showDialog: true,
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
};
</script>
<style scoped>
.md-dialog ::v-deep .md-dialog-container {
  background-color: transparent;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
