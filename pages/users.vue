<template lang="pug">
  .projectWrap
    vue-tabs(v-model="openTab")
      v-tab(title="Users")
        UserManage
      v-tab(title="Roles")
        RoleManage
</template>

<script>
  import UserManage from "~/components/users/UserManage.vue";
  import RoleManage from "~/components/users/RoleManage.vue";
  import {VueTabs, VTab} from 'vue-nav-tabs'

  export default {
    head: {
      title: 'Users',
      link: [{
        hid: "canonical",
        rel: "canonical",
        href: "https://alistat.eu"
      }],
      meta: [
        { hid: 'description', name: 'description', content: 'System for collaborative script development' },
        { hid: 'og:description', name: 'og:description', content: 'System for collaborative script development' },
        { hid: 'og:title', name: 'og:title', content: 'alterstories' },
        { hid: 'og:url', name: 'og:url', content: 'https://github.com/different-ways' },
      ]
    },
    data() {
      return {
        openTab: ""
      }
    },
    components: {
      UserManage,
      RoleManage,
      VueTabs,
      VTab
    },
    beforeCreate() {
      this.$store.commit('setPageHead', 'Users');
    }
  }
</script>

<style scoped lang="scss">

</style>
