import Vue from 'vue';

function newId(elems) {
  return Object.values(elems).map(el => el.id).reduce((a,b) => Math.max(a,b), -1)+1;
}

export function anyCommonArrayKey(arr, obj) {
  for (const elem of arr) {
    if (obj.hasOwnProperty(elem)) {
      return true;
    }
  }
  return false;
}

export function mapToId(arr) {
  return arr.map(el => el.id);
}

/*
  project
    questions
      id ->
        id
        text
        answers
          id ->
            id
            text
            link
            labels
              id ->
                addedAt
            variations
              id ->
                addedAt
        labels:
          id ->
            addedAt
    labels
      id ->
        id
        name
        color
    variations
      id ->
        id
        name
        color
        parent?

 */

export default {
  namespaced: true,
  state: {
    project: {
      questions: {
        0: {
          id: 0,
          text: "Why",
          labels: {},
          answers: {}
        }
      },
      labels: {

      },
      variations: {
        0: {
          id: 0,
          name: "master",
          color: "#0f0f41"
        },
        1: {
          id: 1,
          name: "second",
          color: "#7c7a7a"
        }
      }
    },
    filter: {
      labels: [],
      variations: [],
      text: "",
      showOnlyFilteredAnswers: false
    },
    readOnly: false
  },
  getters: {
    labelName(state) {
      return lid => state.project.labels[lid].name;
    },
    variationName(state) {
      return vid => state.project.variations[vid].name;
    },
    getLabels(state) {
      return Object.values(state.project.labels);
    },
    getVariations(state) {
      return Object.values(state.project.variations);
    },
    getSelectedLabels(state) {
      return state.filter.labels;
    },
    getSelectedVariations(state) {
      return state.filter.variations;
    },
    isFilterActive(state) {
      return state.filter.labels.length > 0
          || state.filter.variations.length > 0
          || !!state.filter.text
    },
    getFilteredQuestions(state, getters) {
      if (state.filter.labels.length === 0) {
        return state.project.questions;
      }
      const labels = mapToId(state.filter.labels);
      const result = [];
      for (const q of Object.values(state.project.questions)) {
        if (anyCommonArrayKey(labels, q.labels)) {
          result.push(q)
        } else {
          for (const a of Object.values(q.answers)) {
            console.log(a.text);
            console.log(a.labels);
            if (anyCommonArrayKey(labels, a.labels)) {
              result.push(q);
              break;
            }
          }
        }
      }

      return result;
    }
  },
  mutations: {
    addQuestion(state, question) {
      const project = state.project;
      question = Object.assign({text: "", answers: {}, labels: {}}, question);
      question.id = newId(project.questions);
      Vue.set(project.questions, question.id, question);
    },
    editQuestion(state, {id: qid, text}) {
      const project = state.project;
      const question = project.questions[qid];
      if (text !== undefined && text !== question.text) {
        question.text = text;
      }
    },
    removeQuestion(state, qid) {
      Vue.delete(state.project.questions, qid);
    },
    addLabel(state, label) {
      const project = state.project;
      label.id = newId(project.labels);
      Vue.set(project.labels, label.id, label)
    },
    editLabel(state, {id: lid, name, color}) {
      const project = state.project;
      const label = project.labels[lid];
      if (name !== undefined && name !== label.name) {
        label.name = name;
      }
      if (color !== undefined && color !== label.color) {
        label.color = color;
      }
    },
    removeLabel(state, lid) {
      Vue.delete(state.project.labels, lid);
      for (const q of Object.values(state.project.questions)) {
        Vue.delete(q.labels, lid);
        for (const a of Object.values(q.answers)) {
          Vue.delete(a.labels, lid);
        }
      }
    },
    addVariation(state, label) {
      const project = state.project;
      label.id = newId(project.labels);
      project.labels[label.id] = label; // TODO XXX
    },
    editVariation(state, {id: vid, name}) {
      const project = state.project;
      const variation = project.variations[vid];
      if (name !== undefined && name !== variation.name) {
        variation.name = name;
      }
    },
    removeVariation(state, vid) {
      Vue.delete(state.project.variations, vid);
      for (const q of Object.values(state.project.questions)) {
        for (const a of Object.values(q.answers)) {
          Vue.delete(a.variations, vid);
        }
      }
      // TODO maybe break when variation found in question
    },
    addAnswer(state, {qid, answer}) {
      const question = state.project.questions[qid];
      answer = Object.assign({text: '', labels: {}, variations: {}}, answer);
      answer.id = newId(question.answers);
      Vue.set(question.answers, answer.id, answer);
    },
    editAnswer(state, {qid, answer: newAnswer}) {
      const answer = state.project.questions[qid].answers[newAnswer.id];
      if (newAnswer.text !== undefined && newAnswer.text !== answer.text) {
        answer.text = newAnswer.text;
      }
      if (newAnswer.link !== undefined && newAnswer.link !== answer.link) {
        answer.link = newAnswer.link;
      }
    },
    removeAnswer(state, qid, aid) {
      const question = state.project.questions[qid];
      Vue.delete(question.answers, aid);
    },
    addLabelToQuestion(state, {qid, lid}) {
      Vue.set(state.project.questions[qid].labels, lid, Date.now());
    },
    removeLabelFromQuestion(state, {qid, lid}) {
      Vue.delete(state.project.questions[qid].labels, lid);
    },
    addLabelToAnswer(state, {qid, aid, lid}) {
      Vue.set(state.project.questions[qid].answers[aid].labels, lid, Date.now());
    },
    removeLabelFromAnswer(state, {qid, aid, lid}) {
      Vue.delete(state.project.questions[qid].answers[aid].labels, lid);
    },
    addAnswerIntoVariation(state, {qid, aid, vid}) {
      Vue.set(state.project.questions[qid].answers[aid].variations, vid, Date.now());
    },
    removeAnswerFromVariation(state, {qid, aid, vid}) {
      Vue.delete(state.project.questions[qid].answers[aid].variations, vid);
    },

    // Front Only
    addLabelToFilter(state, lid) {
      state.filter.labels.push(lid)
    },
    setSelectedLabels(state, selectedLabels) {
      Vue.set(state.filter, 'labels', selectedLabels)
    },
    setSelectedVariations(state, selectedVariations) {
      Vue.set(state.filter, 'variations', selectedVariations)
    }
  },

}
