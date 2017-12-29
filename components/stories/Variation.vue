<template lang="pug">
  span.innerVariationWrap(:style="{backgroundColor: variation.color}")
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
    padding: 0 0.35em 0.1rem;
    vertical-align: middle;
    color: #fff;
    font-size: 0.88rem;
    display: inline-block;
    border-radius: 2px;
  }
  .variationName {
    vertical-align: middle;
  }
  .removeVariation {
    cursor: default;
    vertical-align: middle;
  }
</style>
