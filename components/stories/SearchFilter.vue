<template lang="pug">
  .filterWrap
    h4 Filter
    .labelWrap
      multiselect(:value="getSelectedLabels", :options="getLabels", :multiple="true",
        label="name", track-by="id", placeholder="Filter by label", @input="setSelectedLabels")
    .variationWrap
      multiselect(:value="getSelectedVariations", :options="getVariations", :multiple="true",
        label="name", track-by="id", placeholder="Filter by variation", @input="setSelectedVariations")
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex';
  import Multiselect from 'vue-multiselect';

  export default {
    name: 'SearchFilter',
    data() {
      return {
      }
    },
    computed: {
      ...mapState('stories', ['filter']),
      ...mapGetters('stories', ['getLabels', 'getSelectedLabels', 'getVariations', 'getSelectedVariations'])
    },
    methods: {
      ...mapMutations('stories', ['setSelectedLabels', 'setSelectedVariations'])
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
