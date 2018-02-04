<template lang="pug">
  .loginWrap
    fieldset
      label Username or Email
      input(v-model='username_or_email', @keyup.enter="onLogin", placeholder='john24 or me@example.com...')
    fieldset
      label Password
      input(v-model='password', @keyup.enter="onLogin", type="password", placeholder="Secret password...")
    .error {{loginError}}
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
      ...mapState('users', ['me', 'loginError'])
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

    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
  .loginWrap {
    font-size: 1rem;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0.5rem 0;
  }
  label {
    display: block;
    font-weight: bold;
    color: darkslategrey;
    font-size: 1.05rem;
  }
  input {
    font-size: 1.03rem;
    border-width: 0 0 1px;
    border-color: #2f4f4f;
    padding-left: 0.3rem;
    color: #121212;
    /*font-family: inherit;*/
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  input:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
  .error {
    margin: 0 0 0.5rem 0.5rem;
    color: darkred;
    font-style: italic;
  }
  button {
    font-size: 0.9rem;
  }
</style>
