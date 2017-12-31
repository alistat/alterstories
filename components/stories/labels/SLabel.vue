<template lang="pug">
    span.innerLabelWrap(:style="{color: label.color}")
      span.labelName {{label.name}}
      span.removeLabel(@click="onRemove", v-if="!readOnly", title="Remove")  ✘
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { mapGettersParam } from '../Util';

  export default {
    name: "SLabel",
    props: {
      pid: {
        type: [String, Number]
      },
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
      ...mapGettersParam('stories', { labelsMap: 'pid' }),
      label() {
        return this.labelsMap[this.lid];
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
