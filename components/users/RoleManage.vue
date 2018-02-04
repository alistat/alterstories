<template lang="pug">
  .wrap
    h3.header(v-if="Object.keys(roles).length > 0")  Roles
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
  .wrap {
    padding: 1rem 1.5rem;
  }
  .header {
    margin: 2rem 0 0.8rem;
    color: #587d6e;
    font-weight: 300;
    font-size: 1.5rem;
  }
</style>
