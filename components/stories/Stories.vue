<template lang="pug">
  .storiesWrap(:class="{readOnly: readOnly}")
    SearchFilter
    .questionsWrap
      h3 Questions
      Question(v-for="q in getFilteredQuestions", :key='q.id', :question="q")
    NewQuestion
    LabelManage
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import Question from './Question';
  import NewQuestion from './NewQuestion';
  import LabelManage from './labels/LabelManage';
  import SearchFilter from './SearchFilter';

  export default {
    name: "Stories",
    data() {
      return {

      }
    },
    computed: {
      ...mapState('stories', ['project', 'filter', 'readOnly']),
      ...mapGetters('stories', ['getFilteredQuestions'])
    },
    methods: {
      ...mapMutations('stories', ['addQuestion'])
    },
    components: {
      Question,
      NewQuestion,
      SearchFilter,
      LabelManage,
    }
  }
</script>

<style scoped lang="scss">

</style>
