<template lang="pug">
    span.innerLabelWrap(:style="{color: label.color}")
      span.labelName {{label.name}}
      span.removeLabel(@click="onRemove", v-if="!readOnly", title="Remove")  ✘
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: "SLabel",
    props: {
      lid: {
        type: [String, Number]
      },
      readOnly: {
        type: Boolean,
        'default': false
      }
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState('stories', {labels: state => state.project.labels}),
      label() {
        return this.labels[this.lid];
      }
    },
    methods: {
      onRemove() {
        this.$emit('remove')
      }
    }
  }
</script>

<style scoped lang="scss">
  .innerLabelWrap {
    margin-right: 0.4em;
    color: midnightblue;
    border-radius: 0.25em;
    padding: 0.1em 0.35em;
    vertical-align: middle;
    font-size: 0.9rem;
  }
  .labelName {
    vertical-align: middle;
  }
  .removeLabel {
    cursor: default;
    vertical-align: middle;
    transition: color 0.2s;
  }
  .removeLabel:hover {
    color: darkred;
    transition: color 0.2s;
  }
</style>
