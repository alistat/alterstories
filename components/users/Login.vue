<template lang="pug">
  .loginWrap
    fieldset
      label Username or Email
      input(v-model='username_or_email', placeholder='john24 or me@example.com')
    fieldset
      label Password
      input(v-model='password')
    .control
      button(@click="onLogin") Login
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        username_or_email: '',
        password: ''
      }
    },
    computed: {
      ...mapState('users', ['me'])
    },
    methods: {
      ...mapActions('users', ['login']),
      onLogin() {
        this.login({
          username_or_email: this.username_or_email,
          password: this.password
        })
      }
    },
    components: {

    }
  }
</script>

<style scoped lang="scss">
  fieldset {
    border: none;
    margin: 0;
    padding: 0.5rem 0;
  }
  label {
    display: block;
  }
</style>
