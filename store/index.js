import Vuex from 'vuex';
import StoriesStore from '../components/stories/StoryStore';
import UserStore from '../components/users/UserStore';
import enviroment from '../config/environment';

export function requestConfigExtractor({rootState}) {
  if (rootState.users.token) {
    return {
      headers: {
        'Authorization': 'Bearer ' + rootState.users.token
      }
    }
  } else {
    return {};
  }
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      pageHead: 'alterstories',
      enviroment,
    },
    mutations: {
      setPageHead(state, head) {
        state.pageHead = head;
      }
    },
    modules: {
      stories: StoriesStore,
      users: UserStore,
    }
  })
};

export default createStore
