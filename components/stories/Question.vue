<template lang="pug">
  .questionWrap
    .textWrap
      input.text(v-model="question.text")
    .answersWrap
      Answer.answer(v-for="(answer, _, i) in question.answers", :key='answer.id',
        :answer="answer", :question="question", :index="i")
      NewAnswer(:question="question")
</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex'
  import Answer from './Answer';
  import NewAnswer from './NewAnswer';

  export default {
    name: 'Question',
    props: ['question'],
    data() {
      return {
      }
    },
    computed: {
      // ...mapGetters({quests: 'getSaved', drafts: 'getDrafts'})
    },
    methods: {
      // ...mapMutations(['removeSaved', 'removeDraft'])
    },
    components: {
      Answer,
      NewAnswer
    }
  }
</script>

<style scoped lang="scss">
  .text {
    font-size: 1.5rem;
    border-width: 0 0 1px 0;
    border-color: darkslategray;
  }
  .text:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
  .answersWrap {
    margin: 0.7rem 0.5rem;
  }
  .answer {
    margin-bottom: 0.5rem;
  }
</style>
