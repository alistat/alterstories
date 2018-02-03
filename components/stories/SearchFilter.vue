<template lang="pug">
  .filterWrap
    //h4 Filter
    .head Filter
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
  .filterWrap {
    margin: 1.3rem 0 1.3rem;
    padding: 1rem;
    border: solid lightgrey;
    border-width: 1px 0;
  }
  .head {
    margin-right: 1rem;
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
    color: slategray;
  }
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
