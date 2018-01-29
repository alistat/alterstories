<template lang="pug">
  .projectWrap
    UserManage
</template>

<script>
  import UserManage from "~/components/users/UserManage.vue";

  export default {
    head: {
      title: 'project',
      link: [{
        hid: "canonical",
        rel: "canonical",
        href: "https://alistat.eu"
      }],
      meta: [
        { hid: 'description', name: 'description', content: 'System for collaborative script development' },
        { hid: 'og:description', name: 'og:description', content: 'System for collaborative script development' },
        { hid: 'og:title', name: 'og:title', content: 'alterstories' },
        { hid: 'og:url', name: 'og:url', content: 'https://alistat.eu' },
      ]
    },
    data() {
      return {

      }
    },
    components: {
      UserManage
    },
    beforeCreate() {
      this.$store.commit('setPageHead', 'users');
    }
  }
</script>

<style scoped lang="scss">

</style>
