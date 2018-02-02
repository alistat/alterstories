<template lang="pug">
  .variationWrap
    h5.header New Variation
    span.colorWrap
      input(v-model="color", type="color")
    span.nameWrap
      input.name(v-model="name", @keyup.enter="onSave", placeholder="Variation name...")
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
  .header {
    margin: 0.8rem 0 0.5rem;
    color: #587d6e;
    font-weight: 300;
    font-size: 1rem;
  }
  .name {
    font-size: 1.15rem;
    border-width: 0 0 1px;
    border-color: #2f4f4f;
    padding-left: 0.3rem;
    color: #121212;
    /*font-family: inherit;*/
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .name:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
</style>
