<template lang="pug">
  .confirmInputInnerWrap
    .inputWrap
      input(v-model="val", @input="onInput", type="url", v-if="type=='url'")
      input(v-model="val", @input="onInput", type="date", v-else-if="type=='date'")
      input(v-model="val", @input="onInput", type="number", v-else-if="type=='number'")
      input(v-model="val", @input="onInput", type="text", v-else="type=='text'")
      .changed(v-if="value != lastSavedValue && value != val") Current value is {{value}}
    .controls(:class="{hidden: value == val}")
      img.save(src="https://png.icons8.com/color/50/000000/checked-2.png", @click="onSave", title="Save")
      img.cancel(src="https://png.icons8.com/color/50/000000/close-window.png", @click="onCancel", title="Cancel")
</template>

<script>
  export default {
    name: "ConfirmInput",
    props: {value: {'default': ''}, type: {'default': 'text'}},
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
    width: 100%;
    box-sizing: border-box;
    font-size: 1.15rem;
    border-width: 0 0 1px 0;
    border-color: darkslategray;
    margin-right: 1rem;
    margin-bottom: 0.1rem;
    padding-left: 0.3rem;
    color: #121212;
  }
  input:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
  .confirmInputInnerWrap {
    display: inline-flex;
  }
  .controls {
    margin-left: 0.2rem;
    margin-top: -0.1rem;
  }
  .save, .cancel {
    height: 2rem;
    vertical-align: middle;
  }
  .hidden {
    /*visibility: hidden;*/
    display: none;
  }
</style>
