<template lang="pug">
  .wrap
    h3.header(v-if="Object.keys(users).length > 0") Users
    .usersWrap
      User.user(v-for="user in users", :user="user", :key="user._id")
    NewUser
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import User from './User'
  import NewUser from './NewUser'

  import Login from './Login'

  export default {
    name: 'UserManage',
    data() {
      return {

      }
    },
    computed: {
      ...mapState('users', ['users', 'roles']),
    },
    methods: {
      ...mapActions('users', ['load'])
    },
    components: {
      User,
      NewUser,
      Login
    },
    mounted() {
      this.load();
    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    padding: 1rem 1.5rem;
  }
  .header {
    margin: 2rem 0 0.8rem;
    color: #587d6e;
    font-weight: 300;
    font-size: 1.5rem;
  }
  .user {
    /*max-width: 35rem;*/

  }
</style>
