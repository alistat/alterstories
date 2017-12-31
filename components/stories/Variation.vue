<template lang="pug">
  span.innerVariationWrap(:style="{backgroundColor: variation.color}")
    span.variationName {{variation.name}}
    span.removeVariation(@click="onRemove", v-if="!readOnly", title="Remove")  ✘
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import { mapGettersParam } from './Util';

  export default {
    name: "Variation",
    props: {
      pid: {
        type: [String, Number]
      },
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
      ...mapGettersParam('stories', { variationsMap: 'pid' }),
      variation() {
        return this.variationsMap[this.vid];
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
    margin-right: 0.45em;
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
