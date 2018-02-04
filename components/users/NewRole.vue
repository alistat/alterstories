<template lang="pug">
  .newRoleWrap
    h3.header New Role
    fieldset
      label Name
      input(v-model='name', placeholder="Role name...")
    fieldset
      label.caplabel Capabilities
      multiselect.caps(v-model="capabilities", :options="allCapabilities", :multiple="true",
        placeholder="Select capabilities")
    button(@click="onAdd") Add
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Multiselect from 'vue-multiselect';

  export default {
    name: 'NewRole',
    props: [],
    data() {
      return {
        name: '',
        capabilities: [],
      }
    },
    computed: {
       ...mapGetters('users', {allCapabilities: 'capabilities'})
    },
    methods: {
      ...mapActions('users', ['addRole']),
      onAdd() {
        this.addRole({
          name: this.name,
          capabilities: this.capabilities,
        })
      }
    },
    components: {
      Multiselect
    }
  }
</script>

<style scoped lang="scss">
  .header {
    margin: 2rem 0 0.8rem;
    color: #587d6e;
    font-weight: 300;
    font-size: 1.5rem;
  }
  fieldset {
    border: none;
    margin: 0;
  }
  label {
    min-width: 6rem;
    margin-right: 0.5rem;
    vertical-align: middle;
    display: inline-block;
    /*text-align: right;*/
  }
  .caps {
    max-width: 25rem;
    display: inline-block;
  }
  .caplabel {
    vertical-align: top;
  }
</style>
