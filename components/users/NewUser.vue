<template lang="pug">
  .newUserWrap
    h3.header New User
    fieldset
      label Username
      input(v-model='username', placeholder="lala24")
    fieldset
      label Email
      input(v-model='email', type="email", placeholder="email@example.com")
    fieldset
      label Password
      input(v-model='password', type="password", placeholder="veR1$€kR€t")
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
  }
</style>
