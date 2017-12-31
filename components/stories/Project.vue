<template lang="pug">
  .projectWrap(:class="{readOnly: readOnly}")
    SearchFilter(:pid="pid")
    .questionsWrap
      h3 Questions
      Question(v-for="q in getFilteredQuestions", :key='q.id', :question="q", :pid="pid")
    NewQuestion(:pid="pid")
    LabelManage(:pid="pid")
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { mapGettersParam } from './Util';
  import Question from './Question';
  import NewQuestion from './NewQuestion';
  import LabelManage from './labels/LabelManage';
  import SearchFilter from './SearchFilter';

  export default {
    name: "Project",
    props: ['pid'],
    data() {
      return {

      }
    },
    computed: {
      ...mapState('stories', ['readOnly']),
      ...mapGettersParam('stories', {getFilteredQuestions: 'pid', getProject: 'pid', getFilter: 'pid' })
    },
    methods: {
      ...mapMutations('stories', ['addQuestion'])
    },
    components: {
      SearchFilter,
      Question,
      NewQuestion,
      LabelManage,
    }
  }
</script>

<style scoped lang="scss">

</style>
