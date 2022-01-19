<template>
  <form action="" class="box">
    <b-image
      :src="require('@/assets/buefy.png')"
      alt="The Buefy Logo"
      ratio="601by235"
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
      <b-button type="is-primary" expanded @click="submit">
        Login
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
        await signInWithEmailAndPassword(this.$fire.auth,
          this.email,
          this.password
        )

        this.$router.push('/')
      } catch (e) {
        this.$buefy.toast.open(`Error: ${e}`)
      }
    }
  }
}
</script>
