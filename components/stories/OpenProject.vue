<template lang="pug">
  .openProjectWrap
    .innerWrap
      section.existngProjects(v-if="projectList.length > 0")
        h3.header Projects
        ul.projects
          li.project(v-for="project in projectList", :key="project._id", :class="{open: projectIsOpen(project._id)}",
          @click="onSelect(project._id)") {{project.name}}
      section.newProject(v-if="canI('manage-projects')")
        h3.header New Project
        input.name(v-model="newProjectName", placeholder="New project name", @keyup.enter="onNew")
        button.add(type="button", @click="onNew") Create
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "OpenProject",
    data() {
      return {
        newProjectName: ""
      }
    },
    computed: {
      ...mapState('stories', ['projectList', 'projects']),
      ...mapGetters('users', ['canI'])
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
    mounted() {
      this.loadProjectList();
    }
  }
</script>

<style scoped lang="scss">
  .openProjectWrap {
    text-align: center;
  }
  .innerWrap {
    display: inline-block;
    max-width: 30rem;
    text-align: left;
  }
  .projects {
    padding: 0;
  }
  .project {
    cursor: pointer;
    font-size: 1.3rem;
    padding: 0.25em 0.5em 0.3em;
    transition: background .3s, color .3s;
  }
  .project:hover {
    background: whitesmoke;
    color: #502951;
    transition: background .3s, color .3s;
  }
  li {
    list-style-position: inside;
    list-style-type: kannada;
  }
  .header {
    margin: 2.5rem 0 0.8rem;
    color: #587d6e;
    font-weight: 300;
    font-size: 1.5rem;
  }
  .name {
    /*width: 100%;*/
    font-size: 1.3rem;
    border-width: 0 0 1px;
    border-color: #2f4f4f;
    padding-left: 0.1rem;
    color: #121212;
    font-family: inherit;
    margin-right: 1rem;
    /*border-width: 0 0 1px 0;*/
  }
  .name:focus {
    border-color: darkblue;
    border-width: 0 0 2px 0;
  }
  .add, .name {
    margin-bottom: 0.5rem;
  }
</style>
