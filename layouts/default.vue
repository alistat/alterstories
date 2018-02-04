<template lang="pug">
  div.wrap
    .pageHeader
      nav
        .leftNav
          span.navElem.topLevel.enabled
            nuxt-link(to="/", title="Projects") Projects
          span.navElem.topLevel.enabled(v-if="canI('view-users-roles')")
            nuxt-link(to="/users", title="Users") Users
        .centerNav
          h1.titleHead {{$store.state.pageHead}}
        .rightNav
          span.navElem.topLevel(v-if="!me")
            span.loginButton(@click="$refs.login.open()") Login
          span.navElem.topLevel.loggedIn(v-else)
            span.user(@click="userMenuShow=!userMenuShow") {{me.username}}
            .popUp(:class="{userMenuShow: userMenuShow}")
              .profile.navElem.enabled()
                span Profile
              .logout.navElem.enabled()
                span.logoutButton(@click="logout()") Logout
    .main
      #content
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
  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    name: "DefaultLayout",
    data() {
      return {
        userMenuShow: false
      }
    },
    computed: {
      ...mapState('users', ['me']),
      ...mapGetters('users', ['canI'])
    },
    methods: {
      ...mapActions('users', ['loadMe', 'logout']),
    },
    mounted() {
      this.loadMe();
    },
    components: {
      NuxtLink,
      Login,
      SweetModal
    },
    watch: {
      me(user) {
        if (user) {
          this.$refs.login.close()
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  .pageHeader {
    background: #36798f;
    padding: 0 1rem 0.9rem;
    color: white;
    margin-bottom: 0;
    margin-top: 0;
    font-family: serif;
  }
  h1 {
    margin-top: 0;
    padding-top: 0.8rem;
    margin-bottom: 0;
    letter-spacing: 0.1em;
    text-align: center;
  }
  #content {
    width: 60rem;
    max-width: 98%;
    margin: auto;
    background: white;
    min-height: 50rem;
    padding: 1rem 0;
    margin-bottom: 2rem;
  }
  nav {
    display: flex;
  }
  .leftNav, .rightNav {
    width: 12rem;
  }
  .centerNav {
    flex: auto;
  }
  .rightNav {
    text-align: right;
  }
  .navElem {
    padding: 0.2rem 0.6rem;
    display: inline-block;
    color: white;
    text-decoration: none;
    font-weight: bold;

  }
  .topLevel {
    margin-top: 1rem;
  }
  .navElem a {
    color: white;
    text-decoration: none;
  }
  .navElem.enabled > *:hover {
    text-decoration: underline;
  }
  .loggedIn {
    position: relative;
  }
  .loginButton {
    cursor: pointer;
  }
  .popUp {
    visibility: hidden;
    /*display: none;*/
    /*background: rgba(74, 74, 74, 0.62);*/
    background: rgba(54, 121, 143, 0.96);
    position: absolute;
    right: 0;
    padding: 0.3rem 0 0.3rem;
    text-align: center;
    opacity: 0;
    transition: visibility 0.3s, opacity 0.4s;
  }
  .popUp .navElem {
    /*padding: 0.6rem 0.6rem 0.2rem;*/
    padding: .4rem .6rem .4rem;
    border-top: 1px solid rgba(255, 255, 255, 0.8);;
  }
  .user {
    cursor: default;
    padding: 0 0.6rem;
  }
  .profile, .logout {
    /*display: none;*/
    /*position: absolute;*/
    cursor: pointer;
  }
  /*.profile {*/
    /*top: 100%*/
  /*}*/
  /*.logout {*/
    /*top: 200%*/
  /*}*/
  .loggedIn:hover .popUp, .userMenuShow.popUp {
    visibility: visible;
    opacity: 1;
    /*transition: opacity 0.4s;*/
    transition: visibility 0.3s, opacity 0.4s;
  }
</style>
