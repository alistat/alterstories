<template lang="pug">
  .bootstrapWrap
    .innerWrap(v-if="firstTime")
      h3.header Starting...
      .content
        fieldset
          label Username
          input(v-model='username', placeholder="lala24", required)
        fieldset
          label Email
          input(v-model='email', type="email", placeholder="email@example.com", required)
        fieldset
          label Password
          input(v-model='password', type="password", placeholder="veR1$€kR€t", required)
        button(@click="onDoBootstrap", :disabled="!username || !email || !password") START
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "OpenProject",
    data() {
      return {
        username: '',
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapState('bootstrap', ['firstTime']),
    },
    methods: {
      ...mapActions('bootstrap', ['load', 'bootstrap']),
      onDoBootstrap() {
        this.bootstrap({user: {username: this.username, email: this.email, password: this.password}})
      }
    },
    mounted() {
      this.load();
    }
  }
</script>

<style scoped lang="scss">
  .header {
    margin: 2.5rem 0 0.8rem;
    color: #587d6e;
    font-weight: 300;
    font-size: 1.5rem;
  }
  .bootstrapWrap {
    text-align: center;
  }
  .innerWrap {
    display: inline-block;
    max-width: 30rem;
    text-align: left;
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
  button[disabled] {
    background: lightgray;
    color: gray;
  }
</style>
