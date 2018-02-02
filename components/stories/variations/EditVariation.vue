<template lang="pug">
  .variationWrap
    img.delete(@click="onDelete", src="https://png.icons8.com/color/50/000000/trash.png", title="Delete")
    span.colorWrap
      ConfirmInput.input(:value="variation.color", placeholder="Variation color...", type="color",
      @input="onColorEdit")
    span.nameWrap
      ConfirmInput.input(:value="variation.name", placeholder="Variation name...",
      @input="onNameEdit", :inputStyles="{'border-width': '0 0 1px 0'}")
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import ConfirmInput from '../../ConfirmInput';

  export default {
    name: "EditVariation",
    props: ['pid', 'variation'],
    data() {
      return {
      }
    },
    methods: {
      ...mapActions('stories', ['editVariation', 'removeVariation']),
      onDelete() {
        this.removeVariation({pid: this.pid, vid: this.variation._id});
      },
      onNameEdit(newName) {
        this.editVariation({pid: this.pid, label: {_id: this.variation._id, name: newName}});
      },
      onColorEdit(newColor) {
        this.editVariation({pid: this.pid, label: {_id: this.variation._id, color: newColor}});
      }
    },
    watch: {
    },
    components: {
      ConfirmInput
    }
  }
</script>

<style scoped lang="scss">
  .nameWrap {
    display: inline-block;
    vertical-align: middle;
  }
  .input {
    vertical-align: middle;
  }
  .colorWrap {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  .delete {
    display: inline-block;
    width: 2rem;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
</style>
