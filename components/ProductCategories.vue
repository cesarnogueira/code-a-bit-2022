<template>
  <div class="is-flex is-flex-direction-row is-justify-content-center is-flex-wrap-wrap">
    <ProductCategory v-for="category in categories" :key="category.name" :value="category" />
  </div>
</template>

<script>
import { onSnapshot, collection } from 'firebase/firestore'
import ProductCategory from '~/components/ProductCategory'

export default {
  name: 'ProductCategories',
  components: { ProductCategory },
  data () {
    return {
      categories: [],
      categoriesUnsubscribe: null
    }
  },
  fetch () {
    this.categoriesUnsubscribe = onSnapshot(collection(this.$fire.db, 'categories'), (changes) => {
      this.categories = changes.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data
      }).sort((a, b) => (a.name === 'Outros' || a.name > b.name ? 1 : -1))

      console.log(this.categories.map(doc => doc.name))
    })
  },
  beforeDestroy () {
    this.categoriesUnsubscribe?.()
  }
}
</script>
