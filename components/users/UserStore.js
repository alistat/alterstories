import Vue from 'vue';
import enviroment from '~/config/environment';
import VuexRester from '~/vuex-rester';
import { requestConfigExtractor } from '~/store/index'
import { ONLY_RESPONSE, arrayToMapById } from '~/vuex-rester';
import { canI, expandCapabilities } from './permissions';

const rester = VuexRester({
  dummy :enviroment.dummyBackend,
  baseUrl: enviroment.backendURL+'auth',
  // dummyResponses: DummyResponses,
  configExtractor: requestConfigExtractor
});

const CAPABILITIES = [
  "manage-projects",
  "manage-labels",
  "manage-variations",
  "manage-questions",
  "manage-question-labels",
  "manage-answers",
  "manage-answer-labels",
  "manage-answer-variations",
  "manage-users",
  "view-users",
  "manage-roles",
  "view-roles",
];

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

function persistMe({user, token, tokenExpiration}) {
  localStorage.setItem('users/token', token);
  localStorage.setItem('users/tokenExpiration', tokenExpiration);
  localStorage.setItem('users/user', JSON.stringify(user));
  return {user, token, tokenExpiration};
}

function unpersistMe() {
  localStorage.removeItem('users/token');
  localStorage.removeItem('users/tokenExpiration');
  localStorage.removeItem('users/user');
  return {user, token};
}

export default {
  namespaced: true,
  state: {
    me: null,
    token: '',
    tokenExpiration: null,
    loginError: '',
    users: {

    },
    roles: {

    },
    loaded: false
  },
  getters: {
    capabilities() {
      return CAPABILITIES;
    },
    canI(state) {
      return (action) => {
        return canI(state.me, action)
      }
    }
  },
  mutations: {
    setMe(state, me) {
      if (me.user) {
        if (!me.user.capabilities) {
          me.user.capabilities = {};
        } else {
          const caps = {};
          for (const cap of me.user.capabilities) {
            caps[cap] = true;
          }
          me.user.capabilities = expandCapabilities(caps);
        }
      }
      state.me = me.user;
      state.token = me.token;
      state.tokenExpiration = me.tokenExpiration;
    },
    setLoginError(state, loginError) {
      state.loginError = loginError;
    },
    // logout(state) {
    //
    // },
    setUsers(state, users) {
      state.users = arrayToMapById(users);
      state.loaded = true;
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
    setRoles(state, roles) {
      state.roles = arrayToMapById(roles);
    },
    addRole(state, role) {
      Vue.set(state.roles, role._id, role)
    },
    editRole(state, {_id, name, capabilities}) {
      const role = state.roles[_id];
      if (name) {
        role.name = name;
      }
      if (capabilities) {
        if (Array.isArray(capabilities)) {
          role.capabilities = capabilities;
        } else {
          for (const cap of Object.keys(capabilities)) {
            if (capabilities[cap]) {
              if (!role.capabilities.includes(cap)) {
                role.capabilities.push(cap);
              }
            } else {
              role.capabilities.remove(cap);
            }
          }
        }
      }
    },
    deleteRole(state, rid) {
      Vue.delete(state.roles, rid);
      for (const user of state.users) {
        user.roles.remove(rid);
      }
    },
    addUserToRole(state, {uid, rid}) {
      state.users[uid].roles.remove(rid);
      state.users[uid].roles.push(rid);
    },
    removeUserFromRole(state, {uid, rid}) {
      state.users[uid].roles.remove(rid);
    }
  },
  actions: {
    loadMe(ctx) {
      const token = localStorage.getItem('users/token');
      const tokenExpiration = localStorage.getItem('users/tokenExpiration');
      let user = localStorage.getItem('users/user');
      if (token && user && tokenExpiration && Date.now() < tokenExpiration) {
        try {
          user = JSON.parse(user);
          ctx.commit('setMe', {token, user, tokenExpiration});
          // refresh me
          rester.apiGet(ctx, '/me', 'setMe', freshUser => persistMe({user: freshUser, token, tokenExpiration}));
        } catch (err) {
          console.error('Invalid saved user '+user);
        }
      }
    },
    load(ctx, opts={reload: false}) {
      if (opts.reload || !ctx.state.loaded) {
        rester.apiGet(ctx, '/role', 'setRoles');
        rester.apiGet(ctx, '/user', 'setUsers');
      }
    },
    login(ctx, creds) {
      rester.apiPost(ctx, '/login', creds, 'setMe', null, (_, me) => persistMe(me))
        .then(() => ctx.commit('setLoginError', ''))
        .catch(error => {
          if (error.response && error.response.data.msg) {
            ctx.commit('setLoginError', error.response.data.msg)
          } else {
            ctx.commit('setLoginError', 'Could not login "'+error.message+'". Hope this helps...')
          }
        })
    },
    logout(ctx) {
      ctx.commit('setMe', {token: '', user: null, tokenExpiration: null});
      unpersistMe();
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
      rester.apiPost(ctx, '/role', role, 'addRole', role, ONLY_RESPONSE)
    },
    editRole(ctx, role) {
      rester.apiPatch(ctx, '/role/'+role._id, role, 'editRole', role, ONLY_RESPONSE)
    },
    deleteRole(ctx, rid) {
      rester.apiDelete(ctx, '/role/'+rid, 'deleteRole', rid)
    },
    addUserToRole(ctx, {uid, rid}) {
      rester.apiPost(ctx, `/roleUser/${uid}/${rid}`, {}, 'addUserToRole', {uid, rid})
    },
    removeUserFromRole(ctx, {uid, rid}) {
      rester.apiDelete(ctx, `/roleUser/${uid}/${rid}`, 'removeUserFromRole', {uid, rid})
    }
  }
}
