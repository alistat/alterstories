import {newIntId, newIntIdArr} from '../../vuex-rester';

export default {
  'GET /projectList': [{_id: 0, name: 'main'}, {_id: 1, name: 'Σκηνικά'}],
  'GET /project/0': {
    _id: 0,
    name: "main",
    questions: {
      0: {
        _id: 0,
        text: "Why",
        labels: {},
        answers: {}
      }
    },
    labels: [],
    variations: {
      0: {
        _id: 0,
        name: "master",
        color: "#0f0f41"
      },
      1: {
        _id: 1,
        name: "second",
        color: "#7c7a7a"
      }
    }
  },
  'GET /project/1': {
    _id: 1,
    name: "Σκηνικά",
    questions: [
      {
        _id: 0,
        text: "Τι θα φοράμε στο κεφάλι μας",
        labels: [],
        answers: [
          {
            _id: 0,
            text: 'Καπέλο',
            link: '',
            labels: [
              {
                aid: 0,
                lid: 0,
                addedAt: 1514866227921
              }
            ],
            variations: []
          }, {
            _id: 1,
            text: 'Σκουφί',
            link: 'http://giorgiohatter.gr/image/winter%2016/skoufia/bnu16515.jpg',
            labels: [
              {
                aid: 0,
                lid: 1,
                addedAt: 1514866259733
              }
            ],
            variations: {}
          }
        ]
      }
    ],
    labels: [
      {
        _id: 0,
        name: "Όλα μαύρα",
        color: "#7c7a7a"
      }, {
        _id: 1,
        name: "Πόδια πόδια",
        color: "#ba3946"
      }
    ],
    variations: [
      {
        _id: 0,
        name: "master",
        color: "#0f0f41"
      },
    ]
  },

  'POST /project': function ({state}, urlParams, mutParam, apiParam) {
    return {  _id: newIntIdArr(state.projectList),
      name: apiParam.name, variations: [], labels: [] }
  },
  'POST /question/:pid': function ({state}, urlParams, mutParam, apiParam) {
    return {  _id: newIntId(state.projects[(+urlParams.pid)].questions),
      text: apiParam.text, answers: [], labels: [] }
  },
  'POST /label/:pid': function ({state}, urlParams, mutParam, apiParam) {
    return {  _id: newIntId(state.projects[+urlParams.pid].labels), ...apiParam  }
  },
  'POST /variation/:pid': function ({state}, urlParams, mutParam, apiParam) {
    return {  _id: newIntId(state.projects[+urlParams.pid].variations), ...apiParam  }
  },
  'POST /answer/:pid/:qid': function ({state}, urlParams, mutParam, apiParam) {
    return {  _id: newIntId(state.projects[+urlParams.pid].questions[+urlParams.qid].answers),
      text: apiParam.text, link: apiParam.link }
  }
}
