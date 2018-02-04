<template lang="pug">
  .userWrap(:class="{expand: expand}")
    .content
      .sideControl
        img.expandButton(v-show='!expand', @click="expand=true", title='Expand', src="https://png.icons8.com/color/50/000000/expand-arrow.png")
        img.collapseButton(v-show='expand', @click="expand=false", title='Collapse', src="https://png.icons8.com/color/50/000000/collapse-arrow.png")
      .main
        fieldset
          label.username(v-show='expand') Username
          ConfirmInput.edit.username(:value="user.username", @input="onUsernameEdit", placeholder="lala24")
        fieldset(v-show='expand')
          label Email
          ConfirmInput.edit.email(:value="user.email", type="email", @input="onEmailEdit", placeholder="email@example.com")
        fieldset(v-show='expand')
          label Password
          ConfirmInput.edit.password(v-model="pass", type="password", placeholder="Change password...", @input="onPasswordEdit")
        fieldset(v-show='expand')
          label.rolelabel Roles
          multiselect.roles(:value="user.roles", :options="roles", :multiple="true", label="name",
          track-by="_id", placeholder="Select roles",  @select="onAddRole", @remove="onRemoveRole")
        .controls(v-show='expand')
          label
          button.removeButton(@click="onRemove") Remove User
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ConfirmInput from '../ConfirmInput';
  import Multiselect from 'vue-multiselect';

  export default {
    name: 'User',
    props: ["user"],
    data() {
      return {
        pass: '',
        expand: false
      }
    },
    computed: {
      ...mapState('users', {roles: state => Object.values(state.roles)}),
    },
    methods: {
      ...mapActions('users', ['editUser', 'deleteUser', 'addUserToRole', 'removeUserFromRole']),
      onUsernameEdit(username) {
        this.editUser({
          _id: this.user._id,
          username: username
        })
      },
      onEmailEdit(email) {
        this.editUser({
          _id: this.user._id,
          email: email
        })
      },
      onPasswordEdit(password) {
        this.editUser({
          _id: this.user._id,
          password: password
        });
      },
      onAddRole(role) {
        this.addUserToRole({
          uid: this.user._id,
          rid: role._id
        });
      },
      onRemoveRole(role) {
        this.removeUserFromRole({
          uid: this.user._id,
          rid: role._id
        });
      },
      onRemove() {
        this.deleteUser(this.user._id)
      }
    },
    components: {
      ConfirmInput,
      Multiselect
    }
  }
</script>

<style scoped lang="scss">
  .userWrap.expand {
    margin-bottom: 0.6rem;
  }
  .content {
    display: flex;
  }
  .sideControl {
    width: 1.8rem;
  }
  .main {
    flex: auto;
    padding: 0 0 0 0.5rem;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0.5rem 0;
  }
  label {
    min-width: 6rem;
    margin-right: 0.5rem;
    vertical-align: middle;
    display: inline-block;
  }
  .edit {
    vertical-align: middle;
  }
  .expandButton, .collapseButton {
    margin: .7rem 0 .5rem .5rem;
    cursor: pointer;
  }
  .expandButton {
    width: 1.1rem;
  }
  .collapseButton {
    width: 1.3rem;
    margin: .5rem 0 .5rem .5rem;
  }
  .controls {
    margin: 0.2rem 0 0 0.5rem;
  }
  .removeButton {
    font-size: 0.8rem;
    padding: .3rem 0.7rem;
  }
  .roles {
    max-width: 25rem;
    display: inline-block;
  }
  .rolelabel {
    vertical-align: top;
  }

</style>
