<template lang="pug">
  span.innerVariationWrap
    span.variationName {{variation.name}}
    span.removeVariation(@click="onRemove", v-if="!readOnly", title="Remove")  ✘
</template>

<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    name: "Variation",
    props: {
      vid: {
        type: [String, Number]
      },
      readOnly: {
        type: Boolean,
        'default': false
      }
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapState('stories', {variations: state => state.project.variations}),
      variation() {
        return this.variations[this.vid];
      }
    },
    methods: {
      onRemove() {
        this.$emit('remove')
      }
    }
  }
</script>

<style scoped lang="scss">
  .innerVariationWrap {
    margin-right: 0.4em;
    background: #0f0f41;
    /*border-radius: 0.25em;*/
    padding: 0.1em 0.35em;
    vertical-align: middle;
    color: white;
    font-size: 0.9rem;
  }
  .variationName {
    vertical-align: middle;
  }
  .removeVariation {
    cursor: default;
    vertical-align: middle;
  }
</style>
