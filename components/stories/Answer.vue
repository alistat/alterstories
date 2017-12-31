<template lang="pug">
  .answerWrap(v-if="passesFilter")
    .control
      .index {{index+1}}
      .options
        img.toggleOptions(src="https://png.icons8.com/ios/50/000000/support.png",
          @click="$refs.options.open()", title="Show Options")
    .content
      span.textWrap
        input.text(v-model="answer.text")
        a.link(v-if="answer.link", :href="answer.link", title="Open link in new tab", target="_blank") {{linkDomain}}
      .metaWrap
        span.variationWrap
          Variation(v-for="(addedAt, vid) in answer.variations", :key="vid", :vid="vid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onVariationRemove(vid)")
        span.labelWrap
          SLabel(v-for="(addedAt, lid) in answer.labels", :key="lid", :lid="lid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onLabelRemove(lid)")
          span.noLabels(v-if="labelCount == 0") no labels
    sweet-modal.optionsArea(ref="options")
      h2(slot="title") Answer Options
      .optionsInner
        section
          h4.optionsHead(style="margin-top: 0;") Link
          input.linkEdit(v-model="answer.link", type="url")
        section
          h4.optionsHead Variations
          Variation(v-for="(addedAt, vid) in answer.variations", :key="vid", :vid="vid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onVariationRemove(vid)")
          multiselect.addNew(v-model="newVariation", :options="newVariations", label="name", track-by="id", :multiple="false",
            :allowEmpty="true", :resetAfter="true", :hideSelected="true", selectLabel='',
            placeholder="Add to Variation", @input="onNewVariation", :disabled="newVariations.length == 0")
        section
          h4.optionsHead Labels
          SLabel(v-for="(addedAt, lid) in answer.labels", :key="lid", :lid="lid", :pid="pid",
            :title="'Added at '+formatDate(addedAt)", @remove="onLabelRemove(lid)")
          multiselect.addNew(v-model="newLabel", :options="newLabels", label="name", track-by="id", :multiple="false",
            :allowEmpty="true", :resetAfter="true", :hideSelected="true", selectLabel='', :option-height="20",
            placeholder="Add Label", @input="onNewLabel", :disabled="newLabels.length == 0")

</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'
  import {anyCommonArrayKey, mapToId, getLabels, getVariations} from './StoryStore';
  import { mapGettersParam } from './Util';
  import SLabel from './labels/SLabel';
  import Variation from './Variation';
  import moment from 'moment';
  import Multiselect from 'vue-multiselect';
  import { SweetModal } from 'sweet-modal-vue'

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
      newLabels() {
        return this.getLabels.filter(label => !this.answer.labels.hasOwnProperty(label.id));
      },
      newVariations() {
        let usedVariations = {};
        for (const a of Object.values(this.question.answers)) {
          Object.assign(usedVariations, a.variations);
        }
        return this.getVariations.filter(variation => !usedVariations.hasOwnProperty(variation.id));
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
      labelCount() {
        return Object.keys(this.answer.labels).length;
      },
    },
    methods: {
      ...mapMutations('stories', ['addLabelToAnswer', 'removeLabelFromAnswer',
          'addAnswerIntoVariation', 'removeAnswerFromVariation']),
      onDelete() {

      },
      onNewLabel() {
        if (this.newLabel !== null) {
          this.addLabelToAnswer({
            pid: this.pid,
            qid: this.question.id,
            aid: this.answer.id,
            lid: this.newLabel.id
          });
          this.newLabel = null;
        }
      },
      onLabelRemove(lid) {
        this.removeLabelFromAnswer({
          pid: this.pid,
          qid: this.question.id,
          aid: this.answer.id,
          lid
        })
      },
      onNewVariation() {
        if (this.newVariation !== null) {
          this.addAnswerIntoVariation({
            pid: this.pid,
            qid: this.question.id,
            aid: this.answer.id,
            vid: this.newVariation.id
          });
          this.newVariation = null;
        }
      },
      onVariationRemove(vid) {
        this.removeAnswerFromVariation({
          pid: this.pid,
          qid: this.question.id,
          aid: this.answer.id,
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
    padding: 0 0.4rem 0 0;
    border-right: 1px solid #d3d3d3;
  }
  .index {
    font-size: 1.4rem;
    font-weight: 700;
    color: #483d8b;
    text-align: right;
  }
  .content {
    flex: auto;
  }
  .textWrap {
    display: inline-block;
    /*height: 2.5rem;*/
  }
  .text {
    font-size: 1.15rem;
    border-width: 0 0 1px 0;
    border-color: darkslategray;
    margin-right: 1rem;
    margin-bottom: 0.1rem;
    padding-left: 0.5rem;
    color: #121212;
  }
  .link {
    margin-right: 0.8rem;
    color: #1d1d1d;
    text-decoration: underline;
    font-style: italic;
    transition: color 0.1s;
  }
  .link:hover {
    transition: color 0.1s;
    color: darkblue;
    text-decoration: none;
  }
  .text:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
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
    color: darkslategray;
    display: inline-block;
    vertical-align: middle;
  }
  .toggleOptions {
    display: inline-block;
    width: 1.1rem;;
    vertical-align: middle;
    /*margin-right: 0.5rem;*/
  }
  .delete {
    display: inline-block;
    width: 1.5rem;
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
</style>
