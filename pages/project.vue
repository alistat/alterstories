<template lang="pug">
  .projectWrap
    Stories
</template>

<script>
  import Stories from "~/components/stories/Stories.vue";

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
      Stories
    },
    beforeCreate() {
      this.$store.commit('setPageHead', 'project');
    }
  }
</script>

<style scoped lang="scss">

</style>
