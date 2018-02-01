<template lang="pug">
  .newUserWrap
    h3 New User
    fieldset
      label Username
      input(v-model='username')
    fieldset
      label Email
      input(v-model='email', type="email")
    fieldset
      label Password
      input(v-model='password', type="password")
    button(@click="onAdd") Add
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'NewUser',
    props: [],
    data() {
      return {
        username: '',
        email: '',
        password: ''
      }
    },
    computed: {
      // ...mapGetters({quests: 'getSaved', drafts: 'getDrafts'})
    },
    methods: {
      ...mapActions('users', ['addUser']),
      onAdd() {
        this.addUser({
          username: this.username,
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>

<style scoped lang="scss">
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
</style>
