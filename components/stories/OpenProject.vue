<template lang="pug">
  .openProjectWrap
    ul.projects
      li.project(v-for="project in projectList", :key="project.id", :class="{open: projectIsOpen(project.id)}", @click="onSelect(project.id)") {{project.name}}
    input(v-model="newProjectName", placeholder="New project name", @keyup.enter="onNew")
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: "OpenProject",
    data() {
      return {
        newProjectName: ""
      }
    },
    computed: {
      ...mapState('stories', ['projectList', 'projects'])
    },
    methods: {
      ...mapMutations('stories', ['addProject']),
      projectIsOpen(pid) {
        return this.projects.hasOwnProperty(pid);
      },
      onNew() {
        if (this.newProjectName.match(/^\s*$/ )) {
          return;
        }
        this.addProject({name: this.newProjectName});
        this.$emit('added', this.newProjectName);
        this.newProjectName = "";
      },
      onSelect(pid) {
        this.$emit('selected', pid);
      }
    }
  }
</script>

<style scoped lang="scss">
  .project {
    cursor: pointer;
  }
</style>
