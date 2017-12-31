<template lang="pug">
  .storiesWrap
    Project(:pid="0")

</template>

<script>
  import Project from './Project';

  export default {
    name: "Stories",
    data() {
      return {

      }
    },
    computed: {
    },
    methods: {
    },
    components: {
      Project
    }
  }

</script>

<style scoped lang="scss">

</style>
