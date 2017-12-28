<template lang="pug">
  .labelWrap
    h5.header New Label
    span.nameWrap
      input(v-model="name", @keyup.enter="onSave")
    span.colorWrap
      input(v-model="color", type="color")
    span.actionsWrap
      button(type="button", @click="onSave") + Add
</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex';

  export default {
    name: "NewLabel",
    data() {
      return {
        name: "",
        color: "midnightblue"
      }
    },
    methods: {
      ...mapMutations('stories', ['addLabel']),
      onSave() {
        this.addLabel({name: this.name, color: this.color});
        this.name = "";
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
