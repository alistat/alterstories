<template lang="pug">
  .questionWrap
    h3 New Question
    .textWrap
      input.text(v-model="text", @keyup.enter="onSave")
    .actionsWrap
      button(type="button", @click="onSave") + Add
</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex'

  export default {
    name: 'NewQuestion',
    data() {
      return {
        text: ""
      }
    },
    computed: {
      // ...mapGetters({quests: 'getSaved', drafts: 'getDrafts'})
    },
    methods: {
      ...mapMutations('stories', ['addQuestion']),
      onSave() {
        this.addQuestion({text: this.text})
        this.text = ""
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
  .text {
    font-size: 1.5rem;
    /*border-width: 0 0 1px 0;*/
  }
</style>
