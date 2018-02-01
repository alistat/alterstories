<template lang="pug">
  div.wrap
    .bar
      nav
        .leftNav
          span.navElem
            nuxt-link(to="/", title="Projects") Projects
          span.navElem
            nuxt-link(to="/users", title="Users") Users
        .centerNav
        .rightNav
          span.navElem(v-if="!me")
            snap.loginButton(@click="$refs.login.open()") Login
          span.navElem.loggedIn(v-else)
            span.user {{me.username}}
            span.profile.navElem()
              span Profile
            span.logout.navElem()
              span.logoutButton(@click="logout()") Logout
    .main
      nuxt
    .comps
      SweetModal.loginDialog(ref="login", overlay-theme="dark")
        h2(slot="title") Login
        Login
    style(src="~/node_modules/vue-multiselect/dist/vue-multiselect.min.css")
</template>

<script>
  import Login from '~/components/users/Login.vue';
  import { SweetModal } from 'sweet-modal-vue';
  import NuxtLink from "../.nuxt/components/nuxt-link";
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "DefaultLayout",
    data() {
      return {

      }
    },
    computed: {
      ...mapState('users', ['me'])
    },
    methods: {
      ...mapActions('users', ['loadMe', 'logout'])
    },
    mounted() {
      this.loadMe();
    },
    components: {
      NuxtLink,
      Login,
      SweetModal
    }
  }

</script>

<style scoped lang="scss">
  nav {
    display: flex;
  }
  .centerNav {
    flex: auto;
  }
  .navElem {
    padding: 0.2rem 0.6rem;
  }
  .loggedIn {
    position: relative;
  }
  .loginButton {
    cursor: pointer;
  }
  .profile, .logout {
    display: none;
    position: absolute;
    cursor: pointer;
  }
  .profile {
    top: 100%
  }
  .logout {
    top: 200%
  }
  .loggedIn:hover .profile, .loggedIn:hover .logout {
    display: block;
  }
</style>
