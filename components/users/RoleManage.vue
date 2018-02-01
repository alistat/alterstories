<template lang="pug">
  .wrap
    .rolesWrap
      Role.role(v-for="role in roles", :role="role", :key="role._id")
    NewRole.newRole
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Role from './Role'
  import NewRole from './NewRole'

  export default {
    name: 'RoleManage',
    data() {
      return {

      }
    },
    computed: {
      ...mapState('users', ['roles']),
    },
    methods: {
      ...mapActions('users', ['load'])
    },
    components: {
      Role,
      NewRole
    },
    mounted() {
      this.load();
    }
  }
</script>

<style scoped lang="scss">
  .role, .newRole {
    /*max-width: 35rem;*/
  }
</style>
