<template lang="pug">
  .storiesWrap
    vue-tabs(v-model="openTab")
      v-tab(title="Open Project")
        OpenProject(@selected="onSelected", @added="onAdded")
      v-tab(v-for="project in getOpenProjects", :key="project._id", :title="project.name")
        Project(:pid="project._id", @deleted="onDelete(project._id)")

</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';
  import Vue from 'vue';
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import Project from './Project';
  import OpenProject from './OpenProject'

  export default {
    name: "Stories",
    data() {
      return {
        openTab: ""
      }
    },
    computed: {
      ...mapGetters('stories', ['getOpenProjects']),
      ...mapState('stories', ['projects'])
    },
    methods: {
      onAdded(name) {
//        Vue.nextTick(() => this.openTab = name);
      },
      onSelected(pid) {
        Vue.nextTick(() => this.openTab = this.projects[pid].name);
      },
      onDelete(pid) {
        this.openTab = "Open Project";
      }
    },
    components: {
      Project,
      OpenProject,
      VueTabs,
      VTab
    }
  }

</script>

<style scoped lang="scss">
</style>
