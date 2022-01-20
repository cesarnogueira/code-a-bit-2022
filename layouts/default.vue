<template>
  <div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          >
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-dropdown label="Info">
          <b-navbar-item tag="nuxt-link" to="/about">
            Sobre nós
          </b-navbar-item>
          <b-navbar-item tag="nuxt-link" to="/contact">
            Contactos
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <nuxt-link v-if="!isLoggedIn" class="button is-primary" to="/auth/register">
              <strong>Registar</strong>
            </nuxt-link>

            <nuxt-link v-if="!isLoggedIn" class="button is-light" to="/auth/login">
              Log in
            </nuxt-link>

            <button v-if="isLoggedIn" class="button is-light" @click="logout">
              Logout
            </button>

            <nuxt-link v-if="isLoggedIn" class="button is-light" to="/dashboard">
              Dashboard
            </nuxt-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters('user', [
      'isLoggedIn'
      // Here you can import other getters from the products.js
    ])
  },
  methods: {
    async logout () {
      try {
        await this.$fire.auth.signOut()
        this.$router.go()
      } catch (e) {
        this.$buefy.toast.open(`Error: ${e}`)
      }
    },
    async payment() {
      let formContainer = document.getElementById("dynamic-forms-container");
      let formOptions = {
          chargesUrl: "https://europe-west1-yummy-b5e1a.cloudfunctions.net/notificationHandler",
          merchantTransactionId: "123456",
      };
      let switchJs = new SwitchJs(SwitchJs.environments.TEST, "ACCOUNT_PUBLIC_KEY");
      switchJs.dynamicForms(formContainer, formOptions);
    }
  }
}
</script>
