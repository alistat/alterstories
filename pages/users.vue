<template lang="pug">
  .pageWrap(v-if="canI('view-users-roles')")
    vue-tabs(v-model="openTab")
      v-tab(title="Users", v-if="canI('view-users')")
        UserManage
      v-tab(title="Roles", v-if="canI('view-roles')")
        RoleManage
</template>

<script>
  import UserManage from "~/components/users/UserManage.vue";
  import RoleManage from "~/components/users/RoleManage.vue";
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import { mapGetters } from 'vuex';

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
    computed: {
      ...mapGetters('users', ['canI'])
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
