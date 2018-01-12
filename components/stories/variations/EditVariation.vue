<template lang="pug">
  .variationWrap
    img.delete(@click="onDelete", src="https://png.icons8.com/color/50/000000/trash.png", title="Delete")
    span.nameWrap
      input.name(v-model="name", @keyup.enter="onSave", @input="changedName=true", placeholder="Variation name...")
    span.colorWrap
      input.color(v-model="color", type="color", @input="changedColor=true")
    span.actionsWrap(v-show="changedName || changedColor")
      img.save(src="https://png.icons8.com/color/50/000000/checked-2.png", @click="onSave", title="Save")
      img.cancel(src="https://png.icons8.com/color/50/000000/close-window.png", @click="onCancel", title="Cancel")
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "EditVariation",
    props: ['pid', 'variation'],
    data() {
      return {
        name: this.variation.name,
        color: this.variation.color,
        changedName: false,
        changedColor: false
      }
    },
    methods: {
      ...mapActions('stories', ['editVariation', 'removeVariation']),
      onSave() {
        this.editVariation({pid: this.pid, variation: {_id: this.variation._id, name: this.name, color: this.color}});
        this.changedName = false;
        this.changedColor = false;
      },
      onCancel() {
        this.name = this.variation.name;
        this.color = this.variation.color;
        this.changedName = false;
        this.changedColor = false;
      },
      onDelete() {
        this.removeVariation({pid: this.pid, vid: this.variation._id});
      }
    },
    watch: {
      variation: {
        deep: true,
        handler(variation) {
          this.name = variation.name;
          this.color = variation.color;
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
