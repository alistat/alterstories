<template lang="pug">
  .variationWrap
    h5.header New Variation
    span.nameWrap
      input(v-model="name", @keyup.enter="onSave")
    span.colorWrap
      input(v-model="color", type="color")
    span.actionsWrap
      button(type="button", @click="onSave") + Add
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "NewVariation",
    props: ['pid'],
    data() {
      return {
        name: "",
        color: "midnightblue"
      }
    },
    methods: {
      ...mapActions('stories', ['addVariation']),
      onSave() {
        this.addVariation({pid: this.pid, variation: {name: this.name, color: this.color}});
        this.name = "";
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
