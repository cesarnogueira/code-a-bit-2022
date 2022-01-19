<template>
  <form action="" class="box">
    <b-image
      :src="require('@/assets/buefy.png')"
      alt="The Buefy Logo"
      ratio="601by235"
    />

    <b-field
      label="Nome completo"
    >
      <b-input
        v-model="name"
        type="text"
        maxlength="64"
      />
    </b-field>

    <b-field
      label="Email"
    >
      <b-input
        v-model="email"
        type="email"
        maxlength="32"
      />
    </b-field>

    <b-field label="Password">
      <b-input
        v-model="password"
        type="password"
        password-reveal
      />
    </b-field>

    <b-field label="Confirmar password">
      <b-input
        v-model="confirmPassword"
        type="password"
        password-reveal
      />
    </b-field>

    <b-field>
      <b-button type="is-primary" expanded @click="submit">
        Registar
      </b-button>
    </b-field>
  </form>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth'
export default {
  name: 'RegisterPage',
  layout: 'auth',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async submit () {
      try {
        await createUserWithEmailAndPassword(this.$fire.auth,
          this.email,
          this.password,
          this.name
        )

        this.$router.push('/')
      } catch (e) {
        this.$buefy.toast.open(`Error: ${e}`)
      }
    }
  }
}
</script>
