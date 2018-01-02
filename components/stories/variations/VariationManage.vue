<template lang="pug">
  .variationManageWrap
    h4 Variations
    .variationsWrap
      EditVariation.variation(v-for="variation in getVariations", :key="variation.id", :variation="variation", :pid="pid")
    NewVariation(:pid="pid")
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { mapGettersParam } from '../Util';
  import NewVariation from './NewVariation';
  import EditVariation from './EditVariation';

  export default {
    name: "VariationManage",
    props: ['pid'],
    data() {
      return {
      }
    },
    computed: {
      ...mapGettersParam('stories', { getVariations: 'pid' }),
    },
    methods: {
      ...mapActions('stories', ['editVariation']),
      onSave() {
        this.addVariation({pid: this.pid, variation: {name: this.name, color: this.color}});
        this.name = "";
      }
    },
    components: {
      NewVariation,
      EditVariation
    }
  }
</script>

<style scoped lang="scss">

</style>
