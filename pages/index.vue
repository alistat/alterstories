<template lang="pug">
  .indexWrap
</template>

<script>
  export default {
    head: {
      title: 'alterstories',
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
    },
    beforeCreate() {
      this.$store.commit('setPageHead', 'index');
    }
  }
</script>

<style scoped lang="scss">

</style>
