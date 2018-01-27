<template lang="pug">
  .questionWrap
    .textWrap
      ConfirmInput.text(:value="question.text", @input="onEditText")
      <!--input.text(v-model="question.text")-->
    .control
      button(@click="onRemove") Remove
    .answersWrap
      Answer.answer(v-for="(answer, _, i) in question.answers", :key='answer._id',
        :answer="answer", :question="question", :pid="pid", :index="i")
      NewAnswer(:question="question", :pid="pid")
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import Answer from './Answer';
  import NewAnswer from './NewAnswer';
  import ConfirmInput from '../ConfirmInput';

  export default {
    name: 'Question',
    props: ['question', 'pid'],
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      ...mapActions('stories', ['addLabelToQuestion', 'removeLabelFromQuestion',
        'editQuestion', 'removeQuestion']),
      onEditText(newText) {
        this.editQuestion({
          pid: this.pid,
          question: {
            _id: this.question._id,
            text: newText
          }
        })
      },
      onRemove() {
        this.removeQuestion({
          pid: this.pid,
          qid: this.question._id,
        })
      }
    },
    components: {
      Answer,
      NewAnswer,
      ConfirmInput
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
    margin-bottom: 1rem;
  }
</style>
