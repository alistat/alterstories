<template lang="pug">
  .projectWrap(:class="{readOnly: readOnly}")
    SearchFilter(:pid="pid")
    .questionsWrap
      h3 Questions
      Question.question(v-for="(q, _, i) in getFilteredQuestions", :key='q._id', :question="q", :pid="pid", :index="i+1")
    NewQuestion(:pid="pid")
    LabelManage(:pid="pid")
    VariationManage(:pid="pid")
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { mapGettersParam } from './Util';
  import Question from './Question';
  import NewQuestion from './NewQuestion';
  import LabelManage from './labels/LabelManage';
  import VariationManage from './variations/VariationManage';
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
    },
    components: {
      SearchFilter,
      Question,
      NewQuestion,
      LabelManage,
      VariationManage,
    }
  }
</script>

<style scoped lang="scss">
  .question {
    margin-bottom: 2rem;
  }
</style>
