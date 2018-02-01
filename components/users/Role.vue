<template lang="pug">
  .roleWrap
    .content
      .sideControl
        img.expand(v-show='!expand', @click="expand=true", title='Expand', src="https://png.icons8.com/color/50/000000/expand-arrow.png")
        img.collapse(v-show='expand', @click="expand=false", title='Collapse', src="https://png.icons8.com/color/50/000000/collapse-arrow.png")
      .main
        fieldset
          label.name(v-show='expand') Name
          ConfirmInput.edit.name(:value="role.name", @input="onNameEdit")
        fieldset(v-show='expand')
          label.caplabel Capabilities
          multiselect.caps(:value="role.capabilities", :options="allCapabilities", :multiple="true",
            placeholder="Select capabilities",  @input="onSetCapabilities")
        .controls(v-show='expand')
          button(@click="onRemove") Remove Role
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ConfirmInput from '../ConfirmInput';
  import Multiselect from 'vue-multiselect';

  export default {
    name: 'User',
    props: ["role"],
    data() {
      return {
        pass: '',
        expand: false
      }
    },
    computed: {
      ...mapGetters('users', {allCapabilities: 'capabilities'})
    },
    methods: {
      ...mapActions('users', ['editRole', 'deleteRole']),
      onNameEdit(name) {
        this.editRole({
          _id: this.role._id,
          name: username
        })
      },
      onSetCapabilities(caps) {
        this.editRole({
          _id: this.role._id,
          capabilities: caps
        })
      },
      onRemove() {
        this.deleteRole(this.user._id)
      }
    },
    components: {
      ConfirmInput,
      Multiselect
    }
  }
</script>

<style scoped lang="scss">
  .userWrap {
    /*margin-bottom: 1.5rem;*/
  }
  .content {
    display: flex;
  }
  .sideControl {
    width: 1.8rem;
  }
  .main {
    flex: auto;
    padding: 0 0 0 0.5rem;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0.5rem 0;
  }
  label {
    min-width: 6rem;
    margin-right: 0.5rem;
    vertical-align: middle;
    display: inline-block;
    /*text-align: right;*/
  }
  .edit {
    vertical-align: middle;
  }
  .expand, .collapse {
    margin: .7rem 0 .5rem .5rem;
    cursor: pointer;
  }
  .expand {
    width: 1.1rem;
  }
  .collapse {
    width: 1.3rem;
    margin: .5rem 0 .5rem .5rem;
  }
  .controls {
    /*text-align: center;*/
  }
  .caps {
    max-width: 25rem;
    display: inline-block;
  }
  .caplabel {
    vertical-align: top;
  }

</style>
