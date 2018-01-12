<template lang="pug">
  .openProjectWrap
    ul.projects
      li.project(v-for="project in projectList", :key="project._id", :class="{open: projectIsOpen(project._id)}", @click="onSelect(project._id)") {{project.name}}
    input(v-model="newProjectName", placeholder="New project name", @keyup.enter="onNew")
</template>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex';

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
      ...mapActions('stories', ['loadProjectList', 'loadProject', 'addProject']),
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
        if (!this.projectIsOpen(pid)) {
          this.loadProject(pid)
            .then(() => this.$emit('selected', pid));
        } else {
          this.$emit('selected', pid);
        }

      }
    },
    created() {
      this.loadProjectList();
    }
  }
</script>

<style scoped lang="scss">
  .project {
    cursor: pointer;
  }
</style>
