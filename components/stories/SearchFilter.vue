<template lang="pug">
  .filterWrap
    h4 Filter
    .labelWrap
      multiselect(:value="getSelectedLabels", :options="getLabels", :multiple="true",
        label="name", track-by="_id", placeholder="Filter by label", @input="onSetLabels")
    .variationWrap
      multiselect(:value="getSelectedVariations", :options="getVariations", :multiple="true",
        label="name", track-by="_id", placeholder="Filter by variation", @input="onSetVariations")
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex';
  import { mapGettersParam } from './Util';
  import Multiselect from 'vue-multiselect';

  export default {
    name: 'SearchFilter',
    props: ['pid'],
    data() {
      return {
      }
    },
    computed: {
      ...mapGettersParam('stories',
        {getLabels: 'pid', getSelectedLabels: 'pid', getVariations: 'pid', getSelectedVariations: 'pid'})
    },
    methods: {
      ...mapMutations('stories', ['setSelectedLabels', 'setSelectedVariations']),
      onSetLabels(labels) {
        this.setSelectedLabels({
          pid: this.pid,
          selectedLabels: labels
        })
      },
      onSetVariations(variations) {
        this.setSelectedVariations({
          pid: this.pid,
          selectedVariations: variations
        })
      },
    },
    components: {
      Multiselect
    }
  }
</script>

<style scoped lang="scss">
  .labelWrap {
    max-width: 20rem;
    margin-right: 1rem;
    display: inline-block;
    vertical-align: middle;
  }
  .variationWrap {
    max-width: 20rem;
    display: inline-block;
    vertical-align: middle;
  }
</style>
