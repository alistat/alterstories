<template lang="pug">
  .questionWrap
    h3.header New Question
    .content
      span.textWrap
        textarea.text(v-model="text", @keyup.ctrl.enter="onSave", placeholder="Question text...", rows="1")
      span.actionsWrap
        button.add(type="button", @click="onSave") + Add
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import autosize from 'autosize';
  import Vue from 'vue';

  export default {
    name: 'NewQuestion',
    props: ['pid'],
    data() {
      return {
        text: ""
      }
    },
    computed: {
    },
    methods: {
      ...mapActions('stories', ['addQuestion']),
      onSave() {
        this.addQuestion({pid: this.pid, question: {text: this.text}});
        this.text = "";
        Vue.nextTick(() => autosize.update(this.$el.querySelector('textarea')));
      }
    },
    components: {
    },
    mounted() {
      autosize(this.$el.querySelector('textarea'));
    }
  }
</script>

<style scoped lang="scss">
  .questionWrap {
    padding-left: 1rem;
  }
  .header {
    margin: 2.5rem 0 0.8rem;
    color: #587d6e;
    font-weight: 300;
    font-size: 1.5rem;
    /*text-align: center;*/
  }
  .content {
    display: flex;
    max-width: 45rem;
  }
  .textWrap {
    flex: auto;
    margin-right: 1.5rem;
  }
  .text {
    width: 100%;
    font-size: 1.4rem;
    border-width: 0 0 1px;
    border-color: #2f4f4f;
    padding-left: 0.3rem;
    color: #121212;
    font-family: inherit;
    /*border-width: 0 0 1px 0;*/
  }
  .text:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
  textarea {
    max-height: 6.2em;
    height: 1.5em;
    resize: none !important;
  }
</style>
