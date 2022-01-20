<template>
  <div>
    <b-carousel :pause-hover="false">
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <b-image v-if="carousel.url" class="image banner" :src="carousel.url" />
      </b-carousel-item>
    </b-carousel>

    <ProductCategories class="mt-6" />
  </div>
</template>

<script>
import { getDownloadURL, ref } from 'firebase/storage'
import ProductCategories from '~/components/ProductCategories'

export default {
  name: 'IndexPage',
  components: { ProductCategories },
  data () {
    return {
      carousels: [
        { text: 'Slide 1' },
        { text: 'Slide 2' },
        { text: 'Slide 3' },
        { text: 'Slide 4' },
        { text: 'Slide 5' }
      ]
    }
  },
  async fetch () {
    this.carousels = await Promise.all(this.carousels.map((carosel, i) => new Promise((resolve) => {
      getDownloadURL(ref(this.$fire.storage, `banners/${i + 1}.jpeg`))
        .then((url) => {
          carosel.url = url
          resolve(carosel)
        })
    })))
  }
}
</script>

<style scoped>
.banner {
  height: 40vh;
  object-fit: cover;
}
</style>
