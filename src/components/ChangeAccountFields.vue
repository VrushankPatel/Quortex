<template>
  <div style="height:90px">
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
</style>
