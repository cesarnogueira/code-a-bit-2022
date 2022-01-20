<template>
  <div class="container">
    <section class="section">
      <div class="is-flex is-flex-direction-row is-justify-content-center is-flex-wrap-wrap">
        <ShopProduct v-for="product in products" :key="product.id" :value="product" :show-author="true" />
      </div>
    </section>
  </div>
</template>

<script>
import { query, onSnapshot, collectionGroup, where } from 'firebase/firestore'

export default {
  name: 'CategoriesIndex',
  data () {
    return {
      products: [],
      productsUnsubscribe: null
    }
  },
  async fetch () {
    const shopProducts = query(collectionGroup(this.$fire.db, 'shop-products'), where('category', '==', this.categoryName))
    this.productsUnsubscribe = await onSnapshot(shopProducts, (changes) => {
      this.products = changes.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data
      })
    })
  },
  head () {
    return {
      title: `Yummy | ${this.categoryName}`
    }
  },
  computed: {
    categoryName () {
      return this.$route.params.name
    }
  }
}
</script>
