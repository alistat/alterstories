import Vue from 'vue';
import enviroment from '~/config/environment';
import VuexRester from '~/vuex-rester';
import { requestConfigExtractor } from '~/store/index'
import { ONLY_RESPONSE, arrayToMapById } from '~/vuex-rester';

const rester = VuexRester({
  dummy :enviroment.dummyBackend,
  baseUrl: enviroment.backendURL+'bootstrap',
  // dummyResponses: DummyResponses,
  configExtractor: requestConfigExtractor
});


/*
  firstTime
 */


export default {
  namespaced: true,
  state: {
    firstTime: false,
  },
  mutations: {
    setFirstTime(state, firstTime) {
      state.firstTime = firstTime;
    },
  },
  actions: {
    load(ctx) {
      rester.apiGet(ctx, '/first-time', 'setFirstTime')
        .then(firstTime => {
          if (!firstTime && location) location = '/';
        });
    },
    bootstrap(ctx, params) {
      rester.apiPost(ctx, '/do-bootstrap', params, '', null)
        .then(() => {
          ctx.dispatch('users/login',
            {username_or_email: params.user.username, password: params.user.password},
            { root: true })
            .then(() => location = '/')
        })
    }
  }
}
