<template>
  <form action="" class="box">
    <b-image
      :src="require('@/assets/logo_full.png')"
      alt="The Buefy Logo"
      ratio="3by1"
      class="mb-4"
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
      <b-button type="is-primary" native-type="submit" expanded @click.prevent="submit">
        Registar
      </b-button>
    </b-field>
  </form>
</template>

<script>
import { doc, setDoc } from 'firebase/firestore'
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
        const result = await createUserWithEmailAndPassword(this.$fire.auth,
          this.email,
          this.password,
          this.name
        )

        await setDoc(doc(this.$fire.db, 'users', result.user.uid), {
          name: this.name,
          email: this.email
        })

        this.$router.push('/')
      } catch (e) {
        this.$buefy.toast.open(`Error: ${e}`)
      }
    }
  }
}
</script>
