"use strict";
import Vue from 'vue';
import DummyResponses from './DummyResponses';
import enviroment from '~/config/environment';
import VuexRester from '../../vuex-rester';
import { ONLY_RESPONSE, arrayToMapById } from '../../vuex-rester';

const rester = VuexRester({
  dummy :enviroment.dummyBackend, baseUrl: enviroment.backendURL+'stories', dummyResponses: DummyResponses
});

export function anyCommonArrayKey(arr, obj) {
  for (const elem of arr) {
    if (obj.hasOwnProperty(elem)) {
      return true;
    }
  }
  return false;
}

export function mapToId(arr) {
  return arr.map(el => el._id);
}

function preprocessAnswer(a) {
  a.labels = arrayToMapById(a.labels, 'lid');
  a.variations = arrayToMapById(a.variations, 'vid');
  return a;
}

function preprocessQuestion(q) {
  for (const a of q.answers) {
    preprocessAnswer(a);
  }
  q.labels = arrayToMapById(q.labels, 'lid');
  q.answers = arrayToMapById(q.answers);
  return q;
}

function preprocessProject(project) {
  project.variations = arrayToMapById(project.variations);
  project.labels = arrayToMapById(project.labels);
  for (const q of project.questions) {
    preprocessQuestion(q);
  }
  project.questions = arrayToMapById(project.questions);
  return project;
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
                aid
                lid
                addedAt
            variations
              id ->
                aid
                vid
                addedAt
        labels:
          id ->
            qid
            lid
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
    projectList: [],
    projects: {},
    filters: {},
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
    setProjectList(state, projectList) {
      state.projectList = projectList;
    },
    setProject(state, project) {
      project = preprocessProject(project);
      Vue.set(state.projects, project._id, project);
      Vue.set(
        state.filters,
        project._id,
        {
          labels: [],
          variations: [],
          text: "",
          showOnlyFilteredAnswers: false
        }
      );
    },
    addProject(state, project) {
      project = Object.assign({questions: [], variations: [], labels: []}, project);
      project = preprocessProject(project);
      Vue.set(state.projects, project._id, project);
      Vue.set(
        state.filters,
        project._id,
        {
          labels: [],
          variations: [],
          text: "",
          showOnlyFilteredAnswers: false
        }
      );
      state.projectList.push({_id: project._id, name: project.name});
    },
    editProject(state, {_id: pid, name}) {
      const project = state.projects[pid];
      if (name !== undefined && name !== project.name) {
        project.name = name;
        state.projectList.filter(p => p._id === pid)[0].name = name;
      }
    },
    deleteProject(state, {pid}) {
      Vue.delete(state.projects, pid);
      Vue.delete(state.filters, pid);
      state.projectList = state.projectList.filter(p => p._id !== pid);
    },
    addQuestion(state, {pid, question}) {
      const project = state.projects[pid];
      question = Object.assign({text: "", answers: [], labels: []}, question);
      preprocessQuestion(question);
      Vue.set(project.questions, question._id, question);
    },
    editQuestion(state, {pid, question}) {
      const project = state.projects[pid];
      const {_id: qid, text} = question;
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
      Vue.set(project.labels, label._id, label)
    },
    editLabel(state, {pid, label: lbl}) {
      const project = state.projects[pid];
      const {_id: lid, name, color} = lbl;
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
      Vue.set(project.variations, variation._id, variation);
    },
    editVariation(state, {pid, variation: vari}) {
      const project = state.projects[pid];
      const {_id: vid, name, color} = vari;
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
    },
    addAnswer(state, {pid, qid, answer}) {
      const question = state.projects[pid].questions[qid];
      answer = Object.assign({text: '', labels: [], variations: []}, answer);
      preprocessAnswer(answer);
      Vue.set(question.answers, answer._id, answer);
    },
    editAnswer(state, {pid, qid, answer: newAnswer}) {
      const answer = state.projects[pid].questions[qid].answers[newAnswer._id];
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
  actions: {
    loadProjectList(ctx) {
      return rester.apiGet(ctx, '/projectList',
        'setProjectList')
    },
    loadProject(ctx, pid) {
      return rester.apiGet(ctx, `/project/${pid}`,
        'setProject')
    },
    addProject(ctx, project) {
      return rester.apiPost(ctx, '/project', project,
        'addProject', null, ONLY_RESPONSE)
    },
    editProject(ctx, project) {
      return rester.apiPatch(ctx, '/project/'+project._id, {name: project.name},
        'editProject', project)
    },
    deleteProject(ctx, pid) {
      return rester.apiDelete(ctx, '/project/'+pid,
        'deleteProject', pid)
    },
    addQuestion(ctx, {pid, question}) {
      return rester.apiPost(ctx, '/question/'+pid, question,
        'addQuestion', null, (_, resp) => ({pid, question: resp}))
    },
    editQuestion(ctx, {pid, question}) {
      return rester.apiPatch(ctx, `/question/${pid}/${question._id}`, question,
        'editQuestion', null, (_, resp) => ({pid, question}))
    },
    removeQuestion(ctx, {pid, qid}) {
      return rester.apiDelete(ctx, `/question/${pid}/${qid}`,
        'removeQuestion', {pid, qid})
    },
    addLabel(ctx, {pid, label}) {
      return rester.apiPost(ctx, '/label/'+pid, label,
        'addLabel', null, (_, resp) => ({pid, label: resp}))
    },
    editLabel(ctx, {pid, label}) {
      return rester.apiPatch(ctx, `/label/${pid}/${label._id}`, label,
        'editLabel', null, (_, resp) => ({pid, label}))
    },
    removeLabel(ctx, {pid, lid}) {
      return rester.apiDelete(ctx, `/label/${pid}/${lid}`,
        'removeLabel', {pid, lid})
    },
    addVariation(ctx, {pid, variation}) {
      return rester.apiPost(ctx, '/variation/'+pid, variation,
        'addVariation', null, (_, resp) => ({pid, variation: resp}))
    },
    editVariation(ctx, {pid, variation}) {
      return rester.apiPatch(ctx, `/variation/${pid}/${variation._id}`, variation,
        'editVariation', null, (_, resp) => ({pid, variation: resp}))
    },
    removeVariation(ctx, {pid, vid}) {
      return rester.apiDelete(ctx, `/variation/${pid}/${vid}`,
        'removeVariation', {pid, vid})
    },
    addAnswer(ctx, {pid, qid, answer}) {
      return rester.apiPost(ctx, `/answer/${pid}/${qid}`, answer,
        'addAnswer', null, (_, resp) => ({pid, qid, answer: resp}))
    },
    editAnswer(ctx, {pid, qid, answer}) {
      return rester.apiPatch(ctx, `/answer/${pid}/${qid}/${answer._id}`, answer,
        'editAnswer', null, (_, resp) => ({pid, qid, answer}))
    },
    removeAnswer(ctx, {pid, qid, aid}) {
      return rester.apiDelete(ctx, `/answer/${pid}/${qid}/${aid}`,
        'removeAnswer', {pid, qid, aid})
    },
    addLabelToQuestion(ctx, {pid, qid, lid}) {
      return rester.apiPut(ctx, `/questionLabel/${qid}/${lid}`, null,
        'addLabelToQuestion', {pid, qid, lid})
    },
    removeLabelFromQuestion(ctx, {pid, qid, lid}) {
      return rester.apiDelete(ctx, `/questionLabel/${qid}/${lid}`,
        'addLabelToQuestion', {pid, qid, lid})
    },
    addLabelToAnswer(ctx, {pid, qid, aid, lid}) {
      return rester.apiPut(ctx, `/answerLabel/${aid}/${lid}`, null,
        'addLabelToAnswer', {pid, qid, aid, lid})
    },
    removeLabelFromAnswer(ctx, {pid, qid, aid, lid}) {
      return rester.apiDelete(ctx, `/answerLabel/${aid}/${lid}`,
        'removeLabelFromAnswer', {pid, qid, aid, lid})
    },
    addAnswerIntoVariation(ctx, {pid, vid, qid, aid}) {
      return rester.apiPut(ctx, `/variationAnswer/${aid}/${vid}`, null,
        'addAnswerIntoVariation', {pid, vid, qid, aid})
    },
    removeAnswerFromVariation(ctx, {pid, vid, qid, aid}) {
      return rester.apiDelete(ctx, `/variationAnswer/${aid}/${vid}`,
        'removeAnswerFromVariation', {pid, vid, qid, aid})
    }
  }

}
