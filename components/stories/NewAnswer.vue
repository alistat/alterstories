<template lang="pug">
  .answerWrap
    h5.header New Answer
    span.textWrap
      input(v-model="text", @keyup.enter="onSave")
    span.linkWrap
      input(v-model="link", type="url", @keyup.enter="onSave")
    span.actionsWrap
      button(type="button", @click="onSave") + Add
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'NewAnswer',
    props: ["question"],
    data() {
      return {
        text: "",
        link: ""
      }
    },
    computed: {
      // ...mapGetters({quests: 'getSaved', drafts: 'getDrafts'})
    },
    methods: {
      ...mapMutations('stories', ['addAnswer']),
      onSave() {
        this.addAnswer({qid: this.question.id, answer: {text: this.text, link: this.link}});
        this.text = "";
        this.link = "";
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    /*margin: 0.5em 0 0.2em;*/
    margin: 0.6rem 0 0.1rem;
  }
  .textWrap {
    margin-right: 1rem;
  }
</style>
