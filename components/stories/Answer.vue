<template lang="pug">
  .answerWrap(v-if="passesFilter")
    .control
      .index {{index}}
      .options(v-if="canI('manage-answers') || canI('manage-answer-labels') || canI('manage-answer-variations')")
        img.toggleOptions(src="https://png.icons8.com/ios/50/000000/support.png",
          @click="$refs.options.open()", title="Show Options")
    .content
      .textWrap
        ConfirmInput.text(:value="answer.text", @input="onEditText", type="textarea", :readonly="!canI('manage-answers')")
        .linkWrap
          a.link(v-if="answer.link", :href="answer.link", title="Open link in new tab", target="_blank") {{linkDomain}}
      .metaWrap
        span.variationWrap
          Variation(v-for="(addedAt, vid) in answer.variations", :key="vid", :vid="vid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onVariationRemove(vid)", :readOnly="!canI('manage-answer-variations')")
        span.labelWrap
          SLabel(v-for="(addedAt, lid) in answer.labels", :key="lid", :lid="lid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onLabelRemove(lid)", :readOnly="!canI('manage-answer-labels')")
          span.noLabels(v-if="labelCount == 0") no labels
    sweet-modal.optionsArea(ref="options", overlay-theme="dark")
      h2(slot="title") Answer "{{textCut}}"
      .optionsInner
        section(v-if="canI('manage-answers')")
          h4.optionsHead(style="margin-top: 0;") Link
          ConfirmInput.linkEdit(:value="answer.link", type="url", @input="onEditLink", placeholder="Add a link...")
        section(v-if="canI('manage-answer-variations')")
          h4.optionsHead Variations
          Variation(v-for="(addedAt, vid) in answer.variations", :key="vid", :vid="vid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onVariationRemove(vid)")
          multiselect.addNew(v-model="newVariation", :options="newVariations", label="name", track-by="_id", :multiple="false",
            :allowEmpty="true", :resetAfter="true", :hideSelected="true", selectLabel='',
            placeholder="Add to Variation", @input="onNewVariation", :disabled="newVariations.length == 0")
        section(v-if="canI('manage-answer-labels')")
          h4.optionsHead Labels
          SLabel(v-for="(addedAt, lid) in answer.labels", :key="lid", :lid="lid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onLabelRemove(lid)")
          multiselect.addNew(v-model="newLabel", :options="newLabels", label="name", track-by="_id", :multiple="false",
            :allowEmpty="true", :resetAfter="true", :hideSelected="true", selectLabel='', :option-height="20",
            placeholder="Add Label", @input="onNewLabel", :disabled="newLabels.length == 0")
      button.actionButton.deleteButton(slot="button", @click="onDelete") Remove Answer
      button.actionButton.closeButton(slot="button", @click="$refs.options.close()") Close

</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex';
  import {anyCommonArrayKey, mapToId, getLabels, getVariations} from './StoryStore';
  import { mapGettersParam } from './Util';
  import SLabel from './labels/SLabel';
  import Variation from './variations/Variation';
  import ConfirmInput from '../ConfirmInput';
  import moment from 'moment';
  import Multiselect from 'vue-multiselect';
  import { SweetModal } from 'sweet-modal-vue';

  function getHostName(url) {
    let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:#?]+)/i);
    if (match !== null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    }
    else {
      return null;
    }
  }

  export default {
    name: 'Answer',
    props: ['answer', 'question', 'index', 'pid'],
    data() {
      return {
        newLabel: null,
        newVariation: null,
      }
    },
    computed: {
      ...mapGettersParam('stories', {
        labelsMap: 'pid', getLabels: 'pid', getVariations: 'pid', getFilter: 'pid'
      }),
      ...mapGetters('users', ['canI']),
      newLabels() {
        return this.getLabels.filter(label => !this.answer.labels.hasOwnProperty(label._id));
      },
      newVariations() {
        let usedVariations = {};
        for (const a of Object.values(this.question.answers)) {
          Object.assign(usedVariations, a.variations);
        }
        return this.getVariations.filter(variation => !usedVariations.hasOwnProperty(variation._id));
      },
      passesFilter() {
        const vari =  this.getFilter.variations.length === 0
          || anyCommonArrayKey(mapToId(this.getFilter.variations), this.answer.variations);
        const label = this.getFilter.labels.length === 0
          || anyCommonArrayKey(mapToId(this.getFilter.labels), this.answer.labels);
        return vari && label;
      },
      linkDomain() {
        if (this.answer.link) {
          return getHostName(this.answer.link)
        } else {
          return null
        }
      },
      textCut() {
        let text = this.answer.text;
        if (text.length < 20) {
          return text;
        }
        return text.substr(0, 19)+"..."
      },
      labelCount() {
        return Object.keys(this.answer.labels).length;
      },
    },
    methods: {
      ...mapActions('stories', ['addLabelToAnswer', 'removeLabelFromAnswer',
          'addAnswerIntoVariation', 'removeAnswerFromVariation', 'editAnswer', 'removeAnswer']),
      onDelete() {
        this.removeAnswer({
          pid: this.pid,
          qid: this.question._id,
          aid: this.answer._id
        })
      },
      onEditText(newText) {
        this.editAnswer({
          pid: this.pid,
          qid: this.question._id,
          answer: {
            _id: this.answer._id,
            text: newText
          }
        })
      },
      onEditLink(newLink) {
        this.editAnswer({
          pid: this.pid,
          qid: this.question._id,
          answer: {
            _id: this.answer._id,
            link: newLink
          }
        })
      },
      onNewLabel() {
        if (this.newLabel !== null) {
          this.addLabelToAnswer({
            pid: this.pid,
            qid: this.question._id,
            aid: this.answer._id,
            lid: this.newLabel._id
          });
          this.newLabel = null;
        }
      },
      onLabelRemove(lid) {
        this.removeLabelFromAnswer({
          pid: this.pid,
          qid: this.question._id,
          aid: this.answer._id,
          lid
        })
      },
      onNewVariation() {
        if (this.newVariation !== null) {
          this.addAnswerIntoVariation({
            pid: this.pid,
            qid: this.question._id,
            aid: this.answer._id,
            vid: this.newVariation._id
          });
          this.newVariation = null;
        }
      },
      onVariationRemove(vid) {
        this.removeAnswerFromVariation({
          pid: this.pid,
          qid: this.question._id,
          aid: this.answer._id,
          vid
        })
      },
      formatDate(date) {
        return moment(date).format('LLLL');
      }
    },
    components: {
      SLabel,
      Variation,
      ConfirmInput,
      Multiselect,
      SweetModal,
    },

  }
</script>

<style scoped lang="scss">
  .answerWrap {
    display: flex;
  }
  .control {
    margin-right: 0.45rem;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    border-right: 1px solid #d3d3d3;
  }
  .index {
    font-size: 1.4rem;
    font-weight: 700;
    /*color: #483d8b;*/
    color: #737089;
    text-align: center;
    min-width: 1em;
  }
  .content {
    flex: auto;
    padding-bottom: 0.3rem;
    padding-top: 0.2rem;
  }
  .textWrap {
    /*display: inline-block;*/
    /*height: 2.5rem;*/
    display: flex;
  }
  .text {
    flex: auto;
    font-size: 1.1rem;
  }
  .link {
    margin-left: 0.2rem;
    color: #1d1d1d;
    text-decoration: underline;
    font-style: italic;
    transition: color 0.1s;
    //margin-top: -1.4rem;
    vertical-align: super;
  }
  .link:hover {
    transition: color 0.1s;
    color: darkblue;
    text-decoration: none;
  }
  .addNew {
    max-width: 11rem;
    margin: 0 0.5rem 0 0;
    display: inline-block;
  }
  .metaWrap {
    padding-left: 0.1rem;
  }
  .variationWrap {
    margin-top: 0.2rem;
    display: inline-block;
    padding-bottom: 0.1rem;
  }
  .labelWrap {
    margin-left: 0.3rem;
  }
  .noLabels {
    font-style: italic;
    font-size: 0.8rem;
    /*color: darkslategray;*/
    color: #628989;
    display: inline-block;
    vertical-align: middle;
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
  .optionsInner {
    text-align: start;
  }
  .optionsHead {
    margin: 1.5rem 0 0.6rem;
    font-size: 1.05rem;
  }
  .linkEdit {
    width: 100%;
  }
  .deleteButton {
    margin-right: 1rem;
  }
</style>
