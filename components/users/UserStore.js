import Vue from 'vue';
import enviroment from '~/config/environment';
import VuexRester from '../../vuex-rester';
import { ONLY_RESPONSE, arrayToMapById } from '../../vuex-rester';

const rester = VuexRester({
  dummy :enviroment.dummyBackend, baseUrl: enviroment.backendURL+'auth'//, dummyResponses: DummyResponses
});

/*
  me
    _id
    token
    username
    email
    role
      _id ->
        _id

  users
    _id ->
      _id
      username
      email
      role:
        _id ->
          _id
          capabilities
            name ->
              true
  roles
    _id ->
      _id
      capabilities
        name ->
          true
 */

export default {
  namespaced: true,
  state: {
    me: null,
    users: {

    },
    roles: {

    }
  },
  getters: {

  },
  mutations: {
    login(state, me) {

    },
    logout(state) {

    },
    setUsers(state, users) {
      state.users = arrayToMapById(users);
    },
    editUser(state, newUser) {
      const oldUser = state.users[newUser._id];
      if (newUser.username) {
        oldUser.username = newUser.username
      }
      if (newUser.email) {
        oldUser.email = newUser.email
      }
    },
    addUser(state, user) {
      Vue.set(state.users, user._id, user)
    },
    deleteUser(state, uid) {
      Vue.delete(state.users, uid)
    },
    addRole(state, role) {
      Vue.set(state.roles, role._id, role)
    },
    editRole(stete, role) {

    },
    deleteRole(stete, rid) {

    },
    addUserToRole(state, {uid, rid}) {

    },
    removeUserFromRole(state, {uid, rid}) {

    }
  },
  actions: {
    login(ctx, {username_or_email, password}) {

    },
    logout(ctx) {

    },
    loadUsers(ctx) {
      rester.apiGet(ctx, '/user', 'setUsers')
    },
    editUser(ctx, user) {
      rester.apiPatch(ctx, '/user/'+user._id, user, 'editUser', user, ONLY_RESPONSE)
    },
    addUser(ctx, user) {
      rester.apiPost(ctx, '/user', user, 'addUser', user, ONLY_RESPONSE)
    },
    deleteUser(ctx, uid) {
      rester.apiDelete(ctx, '/user/'+uid, 'deleteUser', uid)
    },
    addRole(ctx, role) {

    },
    editRole(ctx, role) {

    },
    deleteRole(ctx, rid) {

    },
    addUserToRole(ctx, {uid, rid}) {

    },
    removeUserFromRole(ctx, {uid, rid}) {

    }
  }
}
