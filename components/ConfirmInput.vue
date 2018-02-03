<template lang="pug">
  .confirmInputInnerWrap
    .inputWrap
      input(v-model="val", @keyup.ctrl.enter="onCtrlEnter", type="url", v-if="type=='url'",
          :placeholder="placeholder", :readonly="readonly", :style="inputStyles")
      input(v-model="val", @keyup.ctrl.enter="onCtrlEnter", type="date", v-else-if="type=='date'",
          :placeholder="placeholder", :readonly="readonly", :style="inputStyles")
      input(v-model="val", @change="onColorChange", type="color", v-else-if="type=='color'",
          :placeholder="placeholder", :readonly="readonly", :style="inputStyles")
      input(v-model="val", @keyup.ctrl.enter="onCtrlEnter", type="number", v-else-if="type=='number'",
          :placeholder="placeholder", :readonly="readonly", :style="inputStyles")
      input(v-model="val", @keyup.ctrl.enter="onCtrlEnter", type="email", v-else-if="type=='email'",
          :placeholder="placeholder", :readonly="readonly", :style="inputStyles")
      input(v-model="val", @keyup.ctrl.enter="onCtrlEnter", type="password", v-else-if="type=='password'",
          :placeholder="placeholder", :readonly="readonly", :style="inputStyles")
      textarea(v-model="val", @keyup.ctrl.enter="onCtrlEnter", v-else-if="type=='textarea'",
          :placeholder="placeholder", :readonly="readonly", rows="1", :style="inputStyles")
      input(v-model="val", @keyup.ctrl.enter="onCtrlEnter", type="text", v-else,
          :placeholder="placeholder", :readonly="readonly", :style="inputStyles")
      .changed(v-if="changed && type!='color'") Changed: {{value}}
      .changed.colorChanged(v-if="changed && type=='color'", :title="value", :style="{color:value}") Changed
    .controls(:class="{hidden: nonSavable || type=='color'}")
      img.save(src="https://png.icons8.com/color/50/000000/checked-2.png", @click="onSave", title="Save")
      img.cancel(src="https://png.icons8.com/color/50/000000/close-window.png", @click="onCancel", title="Cancel")
</template>

<script>
  import autosize from 'autosize';
  export default {
    name: "ConfirmInput",
    props: {value: {'default': ''}, type: {'default': 'text'}, placeholder: {'default': ''},
        readonly: {'default': false}, inputStyles: {'default': () => ({})}},
    data() {
      return {
        val: this.value,
        lastSavedValue: this.value
      }
    },
    computed: {
      changed() {
        return this.value !== this.lastSavedValue && this.value !== this.val;
      },
      nonSavable() {
        return this.value === this.val;
      }
    },
    methods: {
      onSave() {
        this.$emit('input', this.val);
        this.lastSavedValue = this.val;
      },
      onCancel() {
        this.val = this.value;
        this.lastSavedValue = this.val;
      },
      onCtrlEnter() {
        if (!this.nonSavable) {
          this.onSave();
        }
      },
      onColorChange() {
        if (this.val === this.lastSavedValue) {
          this.onCancel()
        } else {
          this.onSave()
        }
      }
    },
    watch: {
      value(newVal) {
        if (this.val === this.lastSavedValue) {
          this.val = newVal;
          this.lastSavedValue = this.val;
        }
      }
    },
    mounted() {
      if (this.type === 'textarea') {
        window.setTimeout(() => {
          const area = this.$el.querySelector('textarea');
          autosize(area);
          autosize.update(area);
        }, 300);
      }
    }
  }
</script>

<style scoped label="scss">
  .inputWrap {
    flex: auto;
  }
  input:not([type="color"]), textarea {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-size: inherit;
    /*border-width: 0 0 1px 0;*/
    border-width: 0;
    border-color: darkslategray;
    margin-right: 1rem;
    margin-bottom: 0.1rem;
    padding-left: 0.3rem;
    color: #121212;
    font-family: inherit;
  }
  input:not([type="color"]):focus, textarea:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
  textarea {
    max-height: 6.2em;
    min-height: 1.5em;
    resize: none !important;
  }
  .confirmInputInnerWrap {
    display: inline-flex;
  }
  .controls {
    margin-left: 0.2rem;
    margin-top: -0.1rem;
    width: 5.1rem;
  }
  .save, .cancel {
    height: 2rem;
    width: 2rem;
    vertical-align: middle;
  }
  .changed {
    font-size: 0.8em;
  }
  .colorChanged {
    text-align: center;
  }
  .hidden {
    /*visibility: hidden;*/
    display: none;
  }
</style>
