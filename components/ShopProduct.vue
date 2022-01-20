<template>
  <div class="card m-4">
    <div class="card-image">
      <figure class="image is-128x128">
        <img v-if="url" :src="url" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p v-if="showAuthor && owner" class="is-7 has-text-weight-bold">
            {{ owner.shop.name || '' }}
          </p>

          <p v-if="showAuthor && owner" class="is-7 is-italic">
            {{ owner.shop.address || '' }}
          </p>

          <p class="title is-4 mt-4">
            {{ value.name }}
          </p>
          <p class="subtitle is-6">
            {{ value.price }} €
          </p>
        </div>
      </div>

      <div class="content">
        {{ value.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { getDoc, doc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'

export default {
  name: 'ShopProduct',
  props: {
    value: {
      required: true
    },
    showAuthor: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      url: null,
      owner: null
    }
  },
  async fetch () {
    const data = await getDoc(doc(this.$fire.db, 'users', this.value.owner))
    if (data.exists()) {
      this.owner = data.data()
    }

    this.url = await getDownloadURL(ref(this.$fire.storage, `products/${this.value.id}.png`))
  }
}
</script>

<style scoped>
.card {
  width: 20rem;
}

.image {
  margin: 1rem auto 0 auto;
}
</style>
