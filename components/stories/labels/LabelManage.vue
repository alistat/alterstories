<template lang="pug">
  .labelManageWrap
    h4 Labels
    .labelsWrap
      EditLabel.label(v-for="label in getLabels", :key="label.id", :label="label")
    NewLabel
</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex';
  import NewLabel from './NewLabel';
  import EditLabel from './EditLabel';

  export default {
    name: "LabelManage",
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters('stories', ['getLabels'])
    },
    methods: {
      ...mapMutations('stories', ['editLabel', 'removeLabel']),
      onSave() {
        this.addLabel({name: this.name, color: this.color});
        this.name = "";
      }
    },
    components: {
      NewLabel,
      EditLabel
    }
  }
</script>

<style scoped lang="scss">

</style>
