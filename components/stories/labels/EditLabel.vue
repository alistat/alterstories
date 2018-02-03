<template lang="pug">
  .labelWrap
    img.delete(@click="onDelete", src="https://png.icons8.com/color/50/000000/trash.png", title="Delete")
    span.colorWrap
      ConfirmInput.input(:value="label.color", placeholder="Label color...", type="color",
          @input="onColorEdit")
    span.nameWrap
      ConfirmInput.input(:value="label.name", placeholder="Label name...",
          @input="onNameEdit", :inputStyles="{'border-width': '0 0 1px 0'}")
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import ConfirmInput from '../../ConfirmInput';

  export default {
    name: "EditLabel",
    props: ['pid', 'label'],
    data() {
      return {
      }
    },
    methods: {
      ...mapActions('stories', ['editLabel', 'removeLabel']),
      onDelete() {
        this.removeLabel({pid: this.pid, lid: this.label._id});
      },
      onNameEdit(newName) {
        this.editLabel({pid: this.pid, label: {_id: this.label._id, name: newName}});
      },
      onColorEdit(newColor) {
        this.editLabel({pid: this.pid, label: {_id: this.label._id, color: newColor}});
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
    font-size: 1.0rem;
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
