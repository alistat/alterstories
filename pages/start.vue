<template lang="pug">
  .bootstrapWrap
    Bootstrap

</template>

<script>
  import Bootstrap from '~/components/bootstrap/Bootstrap'

  export default {
    head: {
      title: 'Bootstrap',
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

      }
    },
    components: {
      Bootstrap
    },
    beforeCreate() {
      this.$store.commit('setPageHead', 'Bootstrap');
    }
  }
</script>

<style scoped lang="scss">

</style>
