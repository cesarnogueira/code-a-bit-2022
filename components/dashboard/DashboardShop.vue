<template>
  <form action="" class="m-6">
    <h2 class="title">
      Loja
    </h2>

    <b-field
      label="Nome"
    >
      <b-input
        v-model="name"
        type="text"
        maxlength="64"
      />
    </b-field>

    <b-field
      label="Morada"
    >
      <b-input
        v-model="address"
        type="text"
        maxlength="64"
      />
    </b-field>

    <b-field>
      <b-button type="is-primary" @click="submit">
        Submit
      </b-button>
    </b-field>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateDoc, doc } from 'firebase/firestore'

export default {
  name: 'DashboardShop',
  data () {
    return {
      name: '',
      address: ''
    }
  },
  fetch () {
    this.name = this.getUser?.shop?.name || ''
    this.address = this.getUser?.shop?.address || ''
  },
  computed: {
    ...mapGetters('user', [
      'getUser', 'getAuthUser'
      // Here you can import other getters from the products.js
    ])
  },
  methods: {
    async submit () {
      try {
        await updateDoc(doc(this.$fire.db, 'users', this.getAuthUser.uid), {
          shop: {
            name: this.name,
            address: this.address
          }
        })

        this.$buefy.toast.open('Updated')
      } catch (e) {
        this.$buefy.toast.open(`Error: ${e}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
