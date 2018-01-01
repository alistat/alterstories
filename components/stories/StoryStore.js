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
    id
    name
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
    projectList: [
      {
        id: 0,
        name: "main"
      }
    ],
    projects: {
      0: {
        id: 0,
        name: "main",
        questions: {
          0: {
            id: 0,
            text: "Why",
            labels: {},
            answers: {}
          }
        },
        labels: {},
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
      }
    },
    filters: {
      0: {
        labels: [],
        variations: [],
        text: "",
        showOnlyFilteredAnswers: false
      }
    },
    readOnly: false
  },
  getters: {
    getOpenProjects(state) {
      return Object.values(state.projects)
    },
    getProject(state) {
      return pid => state.projects[pid]
    },
    getFilter(state) {
      return pid => state.filters[pid]
    },
    labelName(state) {
      return (pid, lid) => state.projects[pid].labels[lid].name;
    },
    variationName(state) {
      return (pid, vid) => state.projects[pid].variations[vid].name;
    },
    getLabels(state) {
      return pid => Object.values(state.projects[pid].labels);
    },
    getVariations(state) {
      return pid => Object.values(state.projects[pid].variations);
    },
    labelsMap(state) {
      return pid => state.projects[pid].labels;
    },
    variationsMap(state) {
      return pid => state.projects[pid].variations;
    },
    getSelectedLabels(state) {
      return pid => state.filters[pid].labels;
    },
    getSelectedVariations(state) {
      return pid => state.filters[pid].variations;
    },
    isFilterActive(state) {
      return pid => {
        const filter = state.filters[pid];
        return filter.labels.length > 0
          || filter.variations.length > 0
          || !!filter.text;
      }
    },
    getFilteredQuestions(state) {
      return pid => {
        const filter = state.filters[pid];
        const project = state.projects[pid];
        if (filter.labels.length === 0) {
          return project.questions;
        }
        const labels = mapToId(filter.labels);
        const result = [];
        for (const q of Object.values(project.questions)) {
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
      };

    }
  },
  mutations: {
    addProject(state, project) {
      project = Object.assign({questions: {}, variations: {}, labels: {}}, project);
      project.id = newId(state.projects);
      Vue.set(state.projects, project.id, project);
      Vue.set(
        state.filters,
        project.id,
        {
          labels: [],
          variations: [],
          text: "",
          showOnlyFilteredAnswers: false
        }
      );
      state.projectList.push({id: project.id, name: project.name});
    },
    editProject(state, {id: pid, name}) {
      const project = state.projects[pid];
      if (name !== undefined && name !== project.name) {
        project.name = name;
        state.projectList.filter(p => p.id === pid)[0].name = name;
      }
    },
    deleteProject(state, {pid}) {
      Vue.delete(state.projects, pid);
      Vue.delete(state.filters, pid);
      state.projectList = state.projectList.filter(p => p.id !== pid);
    },
    addQuestion(state, {pid, question}) {
      const project = state.projects[pid];
      question = Object.assign({text: "", answers: {}, labels: {}}, question);
      question.id = newId(project.questions);
      Vue.set(project.questions, question.id, question);
    },
    editQuestion(state, {pid, question}) {
      const project = state.projects[pid];
      const {qid, text} = question;
      question = project.questions[qid];
      if (text !== undefined && text !== question.text) {
        question.text = text;
      }
    },
    removeQuestion(state, {pid, qid}) {
      Vue.delete(state.projects[pid].questions, qid);
    },
    addLabel(state, {pid, label}) {
      const project = state.projects[pid];
      label.id = newId(project.labels);
      Vue.set(project.labels, label.id, label)
    },
    editLabel(state, {pid, label: lbl}) {
      const project = state.projects[pid];
      const {id: lid, name, color} = lbl;
      const label = project.labels[lid];
      if (name !== undefined && name !== label.name) {
        label.name = name;
      }
      if (color !== undefined && color !== label.color) {
        label.color = color;
      }
    },
    removeLabel(state, {pid, lid}) {
      const project = state.projects[pid];
      Vue.delete(project.labels, lid);
      for (const q of Object.values(project.questions)) {
        Vue.delete(q.labels, lid);
        for (const a of Object.values(q.answers)) {
          Vue.delete(a.labels, lid);
        }
      }
    },
    addVariation(state, {pid, variation}) {
      const project = state.projects[pid];
      variation.id = newId(project.variations);
      Vue.set(project.variations, variation.id, variation);
    },
    editVariation(state, {pid, variation: vari}) {
      const project = state.projects[pid];
      const {id: vid, name, color} = vari;
      const variation = project.variations[vid];
      if (name !== undefined && name !== variation.name) {
        variation.name = name;
      }
      if (color !== undefined && color !== variation.color) {
        variation.color = color;
      }
    },
    removeVariation(state, {pid, vid}) {
      const project = state.projects[pid];
      Vue.delete(project.variations, vid);
      for (const q of Object.values(project.questions)) {
        for (const a of Object.values(q.answers)) {
          Vue.delete(a.variations, vid);
        }
      }
      // TODO maybe break when variation found in question
    },
    addAnswer(state, {pid, qid, answer}) {
      const question = state.projects[pid].questions[qid];
      answer = Object.assign({text: '', labels: {}, variations: {}}, answer);
      answer.id = newId(question.answers);
      Vue.set(question.answers, answer.id, answer);
    },
    editAnswer(state, {pid, qid, answer: newAnswer}) {
      const answer = state.projects[pid].questions[qid].answers[newAnswer.id];
      if (newAnswer.text !== undefined && newAnswer.text !== answer.text) {
        answer.text = newAnswer.text;
      }
      if (newAnswer.link !== undefined && newAnswer.link !== answer.link) {
        answer.link = newAnswer.link;
      }
    },
    removeAnswer(state, {pid, qid, aid}) {
      const question = state.projects[pid].questions[qid];
      Vue.delete(question.answers, aid);
    },
    addLabelToQuestion(state, {pid, qid, lid}) {
      Vue.set(state.projects[pid].questions[qid].labels, lid, Date.now());
    },
    removeLabelFromQuestion(state, {pid, qid, lid}) {
      Vue.delete(state.projects[pid].questions[qid].labels, lid);
    },
    addLabelToAnswer(state, {pid, qid, aid, lid}) {
      Vue.set(state.projects[pid].questions[qid].answers[aid].labels, lid, Date.now());
    },
    removeLabelFromAnswer(state, {pid, qid, aid, lid}) {
      Vue.delete(state.projects[pid].questions[qid].answers[aid].labels, lid);
    },
    addAnswerIntoVariation(state, {pid, qid, aid, vid}) {
      Vue.set(state.projects[pid].questions[qid].answers[aid].variations, vid, Date.now());
    },
    removeAnswerFromVariation(state, {pid, qid, aid, vid}) {
      Vue.delete(state.projects[pid].questions[qid].answers[aid].variations, vid);
    },

    // Front Only
    addLabelToFilter(state, {pid, lid}) {
      state.filters[pid].labels.push(lid)
    },
    setSelectedLabels(state, {pid, selectedLabels}) {
      Vue.set(state.filters[pid], 'labels', selectedLabels)
    },
    setSelectedVariations(state, {pid, selectedVariations}) {
      Vue.set(state.filters[pid], 'variations', selectedVariations)
    }
  },

}
