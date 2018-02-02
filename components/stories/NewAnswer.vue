<template lang="pug">
  .answerWrap(:class="{expand: expand}")
    .innerWrap
      .control
        .index(v-if="expand", @click="expand=false", title="Click to collapse") *
        .index(v-else) *
      .content
        .collapsed(v-show="!expand")
          span.expandButton(@click="expand=true", title="Click to add answer") Add Answer
        .fields(v-show="expand")
          .textWrap
            label Text
            textarea(v-model="text", placeholder="New answer...", @keyup.ctrl.enter="onSave", rows="1")
          .linkWrap
            label Link
            input(v-model="link", placeholder="New answer's link...", type="url", @keyup.ctrl.enter="onSave")
        span.actionsWrap(v-if="expand")
          button.addButton(type="button", @click="onSave") +
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import autosize from 'autosize';
  import Vue from 'vue';

  export default {
    name: 'NewAnswer',
    props: ["question", "pid"],
    data() {
      return {
        text: "",
        link: "",
        expand: false
      }
    },
    computed: {
    },
    methods: {
      ...mapActions('stories', ['addAnswer']),
      onSave() {
        this.addAnswer({pid: this.pid, qid: this.question._id, answer: {text: this.text, link: this.link}});
        this.text = "";
        this.link = "";
        Vue.nextTick(() => autosize.update(this.$el.querySelector('textarea')));
      }
    },
    mounted() {
        autosize(this.$el.querySelector('textarea'));
    }
  }
</script>

<style scoped lang="scss">
  /*.header {*/
    /*!*margin: 0.5em 0 0.2em;*!*/
    /*margin: 0.6rem 0 0.1rem;*/
  /*}*/
  /*.textWrap {*/
    /*margin-right: 1rem;*/
  /*}*/
  .expandButton {
    font-size: 1rem;
    font-weight: 700;
    color: #123f2f;
    cursor: pointer;
    /*margin-left: 1.2rem;*/
    font-style: italic;
  }
  .expandButton:hover {
    text-decoration: underline;
  }
  .innerWrap {
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
    color: #2a926d;
    text-align: center;
    cursor: default;
    min-width: 1em;
  }
  .expand .index {
    cursor: pointer;
  }
  .content {
    flex: auto;
    display: flex;
    max-width: 27.5rem;
    padding-bottom: 0.2rem;
    padding-top: 0.4rem;
  }
  .fields {
    flex: auto;
    margin-right: 2rem;
  }
  .textWrap {
    margin-bottom: 0.5rem;
  }
  .linkWrap {
    /*margin-bottom: 0.5rem;*/
  }
  label {
    margin-right: .5rem;
    vertical-align: middle;
    /*display: inline-block;*/
    min-width: 5rem;
    display: none;
  }
  input, textarea {
    width: 100%;
    font-size: 1.15rem;
    border-width: 0 0 1px;
    border-color: #2f4f4f;
    padding-left: .3rem;
    color: #121212;
    font-family: inherit;
  }
  input:focus, textarea:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
  textarea {
    max-height: 6.2em;
    height: 1.5em;
    resize: none !important;
  }
  .actionsWrap {
    position: relative;
  }
  .addButton {
    display: inline-block;
    border: none;
    text-align: center;
    background: #2a926d;
    color: white;
    cursor: pointer;
    transition: background 0.5s;
    font-size: 1.5rem;
    width: 2.8rem;
    height: 2.8rem;
    font-family: monospaced,monospace;
    border-radius: 0.1rem;
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
  }
</style>
