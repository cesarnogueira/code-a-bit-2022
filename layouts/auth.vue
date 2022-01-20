<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8-tablet is-6-desktop is-4-widescreen">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginLayout',
  middleware ({ app, redirect, store }) {
    if (store.getters.user) {
      return redirect('/')
    }
  }
}
</script>

<style scoped>
  .hero {
    background: url('~@/assets/login_bg.png');
  }
</style>
