<template lang="pug">
  .wrap
    .usersWrap
      User.user(v-for="user in users", :user="user", :key="user._id")
    NewUser
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import User from './User'
  import NewUser from './NewUser'

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
      ...mapActions('users', ['loadUsers'])
    },
    components: {
      User,
      NewUser
    },
    created() {
      this.loadUsers();
    }
  }
</script>

<style scoped lang="scss">
  .user {
    max-width: 35rem;
  }
</style>
