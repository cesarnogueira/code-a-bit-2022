<template>
  <div>
    <b-carousel :pause-hover="false">
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section :class="`hero is-medium is-${carousel.color}`">
          <div class="hero-body has-text-centered">
            <h1 class="title">
              {{ carousel.text }}
            </h1>
          </div>
        </section>
      </b-carousel-item>
    </b-carousel>

    <ProductCategories />
  </div>
</template>

<script>
import ProductCategories from '~/components/ProductCategories'

export default {
  name: 'IndexPage',
  components: { ProductCategories },
  data () {
    return {
      carousels: [
        { text: 'Slide 1', color: 'primary' },
        { text: 'Slide 2', color: 'info' },
        { text: 'Slide 3', color: 'success' },
        { text: 'Slide 4', color: 'warning' },
        { text: 'Slide 5', color: 'danger' }
      ]
    }
  }
}
</script>
