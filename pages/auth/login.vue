<template>
  <form action="" class="box">
    <b-image
      :src="require('@/assets/logo_full.png')"
      alt="The Buefy Logo"
      ratio="3by1"
      class="mb-4"
    />

    <b-field
      label="Email"
    >
      <b-input
        v-model="email"
        type="email"
        maxlength="64"
      />
    </b-field>

    <b-field label="Password">
      <b-input
        v-model="password"
        type="password"
        password-reveal
      />
    </b-field>

    <b-field>
      <b-button type="is-primary" native-type="submit" expanded @click.prevent="submit">
        Entrar
      </b-button>
    </b-field>
  </form>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'LoginPage',
  layout: 'auth',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      try {
        const result = await signInWithEmailAndPassword(this.$fire.auth,
          this.email,
          this.password
        )

        console.log(result)
        this.$router.push('/')
      } catch (e) {
        this.$buefy.toast.open(`Error: ${e}`)
      }
    }
  }
}
</script>
