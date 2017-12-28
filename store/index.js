import Vuex from 'vuex';
import StoriesStore from '../components/stories/StoryStore';
import UserStore from '../components/users/UserStore';

const createStore = () => {
  return new Vuex.Store({
    state: {
      pageHead: 'alterstories'
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
