import Vue from 'vue';

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

    },
    editUser(state, user) {

    },
    addUser(state, user) {

    },
    deleteUser(state, uid) {

    },
    addRole(state, role) {

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
}
