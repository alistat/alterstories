<template lang="pug">
  .labelWrap
    img.delete(@click="onDelete", src="https://png.icons8.com/color/50/000000/trash.png", title="Delete")
    span.nameWrap
      input.name(v-model="name", @keyup.enter="onSave", @input="changedName=true", placeholder="Label name...")
    span.colorWrap
      input.color(v-model="color", type="color", @input="changedColor=true")
    span.actionsWrap(v-show="changedName || changedColor")
      img.save(src="https://png.icons8.com/color/50/000000/checked-2.png", @click="onSave", title="Save")
      img.cancel(src="https://png.icons8.com/color/50/000000/close-window.png", @click="onCancel", title="Cancel")
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "EditLabel",
    props: ['pid', 'label'],
    data() {
      return {
        name: this.label.name,
        color: this.label.color,
        changedName: false,
        changedColor: false
      }
    },
    methods: {
      ...mapActions('stories', ['editLabel', 'removeLabel']),
      onSave() {
        this.editLabel({pid: this.pid, label: {_id: this.label._id, name: this.name, color: this.color}});
        this.changedName = false;
        this.changedColor = false;
      },
      onCancel() {
        this.name = this.label.name;
        this.color = this.label.color;
        this.changedName = false;
        this.changedColor = false;
      },
      onDelete() {
        this.removeLabel({pid: this.pid, lid: this.label._id});
      }
    },
    watch: {
      label: {
        deep: true,
        handler(label) {
          this.name = label.name;
          this.color = label.color;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .nameWrap {
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  input.name {
    vertical-align: middle;
  }
  .colorWrap {
    vertical-align: middle;
    margin-right: 1rem;
  }
  input.color {
    vertical-align: middle;
  }
  .actionsWrap {
    vertical-align: middle;
  }
  .save, .cancel {
    width: 2.2rem;
    vertical-align: middle;
  }
  .delete {
    width: 2rem;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
</style>
