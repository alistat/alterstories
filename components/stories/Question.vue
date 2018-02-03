<template lang="pug">
  .questionWrap
    .head
      .control
        .index {{index}}
        //.options
          img.toggleOptions(src="https://png.icons8.com/ios/50/000000/support.png",
          @click="$refs.options.open()", title="Show Options")
      .content
        .index.mobile {{index}})
        .textWrap
          ConfirmInput.text(:value="question.text", @input="onEditText", type="textarea")
        .meta
          SLabel(v-for="(addedAt, lid) in question.labels", :key="lid", :lid="lid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onLabelRemove(lid)")
        .answersWrap
          Answer.answer(v-for="(answer, _, i) in question.answers", :key='answer._id',
            :answer="answer", :question="question", :pid="pid", :index="answerNumbering(i)")
          NewAnswer(:question="question", :pid="pid")
        .actions
          button.propertiesButton(@click="$refs.options.open()", title="Show Options") Options
        sweet-modal.optionsArea(ref="options", overlay-theme="dark")
          h2(slot="title") Question "{{textCut}}"
          .optionsInner
            section
              h4.optionsHead Labels
              SLabel(v-for="(addedAt, lid) in question.labels", :key="lid", :lid="lid", :pid="pid",
                :title="'Added at '+formatDate(addedAt)", @remove="onLabelRemove(lid)")
              multiselect.addNew(v-model="newLabel", :options="newLabels", label="name", track-by="_id", :multiple="false",
                :allowEmpty="true", :resetAfter="true", :hideSelected="true", selectLabel='', :option-height="20",
                placeholder="Add Label", @input="onNewLabel", :disabled="newLabels.length == 0")
          button.actionButton.deleteButton(slot="button", @click="onRemove") Remove Question
          button.actionButton.closeButton(slot="button", @click="$refs.options.close()") Close

</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import { mapGettersParam } from './Util';
  import Answer from './Answer';
  import NewAnswer from './NewAnswer';
  import SLabel from './labels/SLabel';
  import ConfirmInput from '../ConfirmInput';
  import Multiselect from 'vue-multiselect';
  import { SweetModal } from 'sweet-modal-vue';
  import moment from 'moment';

  const A_CODE = "A".charCodeAt(0);

  export default {
    name: 'Question',
    props: ['question', 'pid', 'index'],
    data() {
      return {
        newLabel: null,
      }
    },
    computed: {
      ...mapGettersParam('stories', {
        labelsMap: 'pid', getLabels: 'pid',
      }),
      newLabels() {
        return this.getLabels.filter(label => !this.question.labels.hasOwnProperty(label._id));
      },
      textCut() {
        let text = this.question.text;
        if (text.length < 20) {
          return text;
        }
        return text.substr(0, 19)+"..."
      },
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
      },
      onNewLabel() {
        if (this.newLabel !== null) {
          this.addLabelToQuestion({
            pid: this.pid,
            qid: this.question._id,
            lid: this.newLabel._id
          });
          this.newLabel = null;
        }
      },
      onLabelRemove(lid) {
        this.removeLabelFromQuestion({
          pid: this.pid,
          qid: this.question._id,
          lid
        })
      },
      formatDate(date) {
        return moment(date).format('LLLL');
      },
    },
    components: {
      Answer,
      NewAnswer,
      ConfirmInput,
      Multiselect,
      SLabel,
      SweetModal
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
    @media all and (max-width: 40rem){
      display: none;
    }
    /*border-right: 1px solid #d3d3d3;*/
  }
  .index {
    font-size: 1.5rem;
    font-weight: 700;
    color: #483d8b;
    text-align: center;
    min-width: 1em;
  }
  .index.mobile {
    display: none;
    @media all and (max-width: 40rem){
      display: inline-block;
    }
  }
  .content {
    flex: auto;
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
  }
  /*.options {*/
    /*text-align: center;*/
  /*}*/
  /*.toggleOptions {*/
    /*display: inline-block;*/
    /*width: 1.1rem;;*/
    /*vertical-align: middle;*/
    /*!*margin-right: 0.5rem;*!*/
  /*}*/
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
  .meta {
    padding: 0 0 1rem;
  }
  .actions {
    padding: 1.3rem 0 0;
  }
  .addNew {
    max-width: 11rem;
    margin: 0 0.5rem 0 0;
    display: inline-block;
    vertical-align: middle;
  }
  .propertiesButton {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.8rem;
    padding: .3rem 0.7rem;
  }
  .answersWrap {
    /*margin: 0.7rem 0;*/
    /*padding-left: 1rem;*/
    max-width: 32rem;
  }
  .answer {
    border-bottom: 1px solid #d3d3d3;
  }
  .optionsInner {
    text-align: start;
  }
  .optionsHead {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
  }
  .deleteButton {
    margin-right: 1rem;
  }
</style>
