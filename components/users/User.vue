<template lang="pug">
  .userWrap
    fieldset
      img.expand(v-show='!expand', @click="expand=true", title='Expand', src="https://png.icons8.com/color/50/000000/expand-arrow.png")
      <!--span.expand(v-show='!expand', @click="expand=true", title='Expand') &#9650;-->
      img.collapse(v-show='expand', @click="expand=false", title='Collapse', src="https://png.icons8.com/color/50/000000/collapse-arrow.png")
      <!--span.collapse(v-show='expand', @click="expand=false", title='Collapse') &#9660;-->

      label.username(v-show='expand') Username
      ConfirmInput.edit.username(:value="user.username", @input="onUsernameEdit")
    fieldset(v-show='expand')
      label Email
      ConfirmInput.edit.email(:value="user.email", type="email", @input="onEmailEdit")
    fieldset(v-show='expand')
      label Password
      ConfirmInput.edit.password(v-model="pass", type="password", placeholder="Change password...", @input="onPasswordEdit")
    .controls(v-show='expand')
      button(@click="onRemove") Remove User
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ConfirmInput from '../ConfirmInput';

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
      // ...mapGetters({quests: 'getSaved', drafts: 'getDrafts'})
    },
    methods: {
      ...mapActions('users', ['editUser', 'deleteUser']),
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
      onRemove() {
        this.deleteUser(this.user._id)
      }
    },
    components: {
      ConfirmInput
    }
  }
</script>

<style scoped lang="scss">
  .userWrap {
    /*margin-bottom: 1.5rem;*/
  }
  fieldset {
    border: none;
    margin: 0;
  }
  label {
    min-width: 7.5rem;
    margin-right: 0.5rem;
    vertical-align: middle;
    display: inline-block;
    text-align: right;
  }
  label.username {
    min-width: 5.7rem;
  }
  .edit {
    vertical-align: middle;
  }
  .expand, .collapse {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .expand {
    width: 1.1rem;
  }
  .collapse {
    width: 1.3rem;
  }
  .controls {
    text-align: center;
  }

</style>
