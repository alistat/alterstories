<template lang="pug">
  .questionWrap
    .head
      .control
        .index {{index}}
        //.options
          img.toggleOptions(src="https://png.icons8.com/ios/50/000000/support.png",
          @click="$refs.options.open()", title="Show Options")
      .content
        .textWrap
          ConfirmInput.text(:value="question.text", @input="onEditText", type="textarea")
          <!--.control -->
            <!--button(@click="onRemove") Remove-->
        .answersWrap
          Answer.answer(v-for="(answer, _, i) in question.answers", :key='answer._id',
            :answer="answer", :question="question", :pid="pid", :index="answerNumbering(i)")
          NewAnswer(:question="question", :pid="pid")
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import Answer from './Answer';
  import NewAnswer from './NewAnswer';
  import ConfirmInput from '../ConfirmInput';

  const A_CODE = "A".charCodeAt(0);

  export default {
    name: 'Question',
    props: ['question', 'pid', 'index'],
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
      },
      answerNumbering(index) {
        return index < 26 ? String.fromCharCode(A_CODE+index) : index+1;
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
  .head {
    display: flex;
  }
  .control {
    margin-right: 0.45rem;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    /*border-right: 1px solid #d3d3d3;*/
  }
  .index {
    font-size: 1.5rem;
    font-weight: 700;
    color: #483d8b;
    text-align: center;
    min-width: 1em;
  }
  .content {
    flex: auto;
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
  }
  .options {
    text-align: center;
  }
  .toggleOptions {
    display: inline-block;
    width: 1.1rem;;
    vertical-align: middle;
    /*margin-right: 0.5rem;*/
  }
  .text {
    font-size: 1.5rem;
    border-width: 0 0 1px 0;
    border-color: darkslategray;
    width: 100%;
    max-width: 35rem;
  }
  .text:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
  .answersWrap {
    /*margin: 0.7rem 0;*/
    /*padding-left: 1rem;*/
    max-width: 32rem;
  }
  .answer {
    border-bottom: 1px solid #d3d3d3;
  }
</style>
