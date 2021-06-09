<template>
  <div class="wrapper">
    <div class="form">
      <b-icon-person-circle class="form__signin-icon" />
      <h1 class="form__signin-text">Sign In</h1>

      <b-alert
        variant="danger"
        :show="alertShow"
        dismissible
        fade
        @dismissed="alertShow = 0"
        >{{ alertMsg }}</b-alert
      >

      <b-form-input
        v-model="email"
        type="text"
        placeholder="email"
        required
      />
      <b-form-input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <b-button class="form__signin-btn" @click="handleClickSignInBtn"
        >Sign In</b-button
      >
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async handleClickSignInBtn () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .form {
    text-align: center;
    min-width: 450px;
    border-radius: 5px;
    padding: 20px 30px 50px;
    -webkit-box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    -moz-box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);

    .form__signin-icon {
      color: var(--blue-3);
      font-size: 120px;
      margin: 20px 0;
    }

    .form__signin-text {
      font-weight: 700;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    input {
      margin: 20px 0;
      padding: 30px;
      font-size: 1.2rem;
      font-weight: 500;
      opacity: 0.7;
    }

    .form__signin-btn {
      width: 100%;
      font-size: 1.3rem;
      padding: 10px 0px;
      background-color: var(--blue-3);
      border-color: var(--blue-3);
      transition: all 300ms ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
