<template>
  <div class="is-flex is-flex-direction-column" style="height: 100%">
    <b-navbar shadow fixed-top>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            :src="require('@/assets/logo_full.png')"
            alt="Lightweight UI components for Vue.js based on Bulma"
          >
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="nuxt-link" to="/about">
          Sobre nós
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <nuxt-link v-if="!isLoggedIn" class="button is-primary" to="/auth/register">
              <strong>Registar</strong>
            </nuxt-link>

            <nuxt-link v-if="!isLoggedIn" class="button is-light" to="/auth/login">
              Entrar
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

    <section class="hero is-dark is-small pt-4" style="margin-top: auto">
      <div class="hero-body is-flex is-flex-direction-row">
        <div class="mx-6">
          <p class="title is-size-5 pb-4">
            Ligações de interesse
          </p>
          <nuxt-link class="subtitle is-size-6 is-block" to="/about">
            Sobre nós
          </nuxt-link>
        </div>

        <div class="mx-6 ">
          <p class="title is-size-5 pb-4">
            Segue nos
          </p>
          <nuxt-link class="subtitle is-size-6 is-block" to="#">
            <b-icon
              icon="facebook"
              size="is-small"
            /> Facebook
          </nuxt-link>
          <nuxt-link class="subtitle is-size-6 is-block" to="#">
            <b-icon
              icon="instagram"
              size="is-small"
            /> Instagram
          </nuxt-link>
        </div>

        <div class="ml-auto mr-6 is-align-self-center">
          <p class="subtitle is-size-6 is-block" to="#">
            &copy; Code a Bit 2022, Todos os direitos reservados
          </p>
        </div>
      </div>
    </section>
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
    }
  }
}
</script>

<style>
html,body, #__nuxt, #__layout{
  height:100%!important;
  width: 100%!important;
}

</style>
