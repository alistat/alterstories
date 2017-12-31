<template lang="pug">
  .confirmInputInnerWrap
    .inputWrap
      input(v-model="val", @input="onInput")
      .changed(v-if="value != lastSavedValue && value != val") Current value is {{value}}
    .controls(v-show="")
      img.save(src="https://png.icons8.com/color/50/000000/checked-2.png", @click="onSave", title="Save")
      img.cancel(src="https://png.icons8.com/color/50/000000/close-window.png", @click="onCancel", title="Cancel")
</template>

<script>
  export default {
    name: "ConfirmInput",
    props: ["value"],
    data() {
      return {
        val: this.value,
        lastSavedValue: this.value
      }
    },
    computed: {

    },
    methods: {
      onSave() {
        this.$emit('input', this.val);
        this.lastSavedValue = this.val;
      },
      onCancel() {
        this.val = this.value;
      },
      onInput() {

      }
    }
  }
</script>

<style scoped label="scss">
  .inputWrap {
    flex: auto;
  }
  input {
    display: block;
  }
  .confirmInputInnerWrap {
    display: inline-flex;
  }
</style>
