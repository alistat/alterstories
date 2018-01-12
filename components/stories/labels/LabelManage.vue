<template lang="pug">
  .labelManageWrap
    h4 Labels
    .labelsWrap
      EditLabel.label(v-for="label in getLabels", :key="label._id", :label="label", :pid="pid")
    NewLabel(:pid="pid")
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { mapGettersParam } from '../Util';
  import NewLabel from './NewLabel';
  import EditLabel from './EditLabel';

  export default {
    name: "LabelManage",
    props: ['pid'],
    data() {
      return {
      }
    },
    computed: {
      ...mapGettersParam('stories', { getLabels: 'pid' }),
    },
    methods: {
      ...mapActions('stories', ['editLabel']),
      onSave() {
        this.addLabel({pid: this.pid, label: {name: this.name, color: this.color}});
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
