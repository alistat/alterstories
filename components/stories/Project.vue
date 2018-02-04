<template lang="pug">
  .projectWrap(:class="{readOnly: readOnly}")
    h3.midHead(v-if="canI('manage-projects') || canI('manage-labels') || canI('manage-variations')")  Options
    .options
      button.manageLabels(@click="$refs.labelsVariations.open('Labels')", v-if="canI('manage-labels')") Manage Labels
      button.manageVariations(@click="$refs.labelsVariations.open('Variations')", v-if="canI('manage-variations')") Manage Variations
      button.showProperties(@click="$refs.properties.open()", v-if="canI('manage-projects')") Properties
    .questionsWrap
      h3.midHead  Questions
      SearchFilter(:pid="pid")
      Question.question(v-for="(q, i) in getSortedQuestions", :key='q._id', :question="q", :pid="pid", :index="i+1")
    NewQuestion(:pid="pid", v-if="canI('manage-questions')")
    sweet-modal.labelsVariations(ref="labelsVariations", title="Labels & Variations")
      sweet-modal-tab(title="Labels", id="Labels")
        .tabInner
          LabelManage.manager(:pid="pid")
      sweet-modal-tab(title="Variations", id="Variations")
        .tabInner
          VariationManage.manager(:pid="pid")
      <!--button.actionButton.closeButton(slot="button", color="red", @click="$refs.labelsVariations.close()") Close-->
    sweet-modal.properties(ref="properties", :title="'Properties of '+getProject.name")
      span.nameWrap
        label.nameLabel Name:
        ConfirmInput.nameEdit(:value="getProject.name", placeholder="Project name...", @input="onRename")
      button.actionButton.deleteButton(slot="button", color="red", @click="onDelete") Delete Project
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { mapGettersParam } from './Util';
  import Question from './Question';
  import NewQuestion from './NewQuestion';
  import LabelManage from './labels/LabelManage';
  import VariationManage from './variations/VariationManage';
  import SearchFilter from './SearchFilter';
  import { SweetModal, SweetModalTab } from 'sweet-modal-vue';
  import ConfirmInput from '../ConfirmInput';


  export default {
    name: "Project",
    props: ['pid'],
    data() {
      return {

      }
    },
    computed: {
      ...mapState('stories', ['readOnly']),
      ...mapGettersParam('stories', {getSortedQuestions: 'pid', getProject: 'pid', getFilter: 'pid' }),
      ...mapGetters('users', ['canI'])
    },
    methods: {
      ...mapActions('stories', ['editProject', 'deleteProject']),
      onRename(newName) {
        this.editProject({
          _id: this.pid,
          name: newName
        })
      },
      onDelete() {
        this.deleteProject({pid: this.pid})
      }
    },
    components: {
      SearchFilter,
      Question,
      NewQuestion,
      LabelManage,
      VariationManage,
      SweetModal,
      SweetModalTab,
      ConfirmInput
    }
  }
</script>

<style scoped lang="scss">
  .projectWrap {
    padding: 0 2rem 3rem;
    @media all and (max-width: 40rem){
      padding: 0 1rem 2.5rem;
    }
    @media all and (max-width: 30rem){
      padding: 0 0.5rem 2rem;
    }
  }
  .midHead {
    /*text-align: center;*/
    font-weight: normal;
    margin: 1.5rem 0 1rem;
    font-size: 1.4rem;
    color: darkslategray;
  }
  .options {
    /*padding: 1rem 0 0;*/
    text-align: center;
  }
  .options button {
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  .question {
    margin-bottom: 2rem;
  }
  .tabInner {
    text-align: center;
    padding-bottom: 1.5rem;
  }
  .manager {
    text-align: left;
    display: inline-block;
  }
  .nameLabel {
    display: inline-block;
    vertical-align: middle;
    min-width: 6rem;
    margin-right: .5rem;
    font-size: 1.05rem;
  }
  .nameEdit {
    vertical-align: middle;
    font-size: 1rem;
  }
</style>
