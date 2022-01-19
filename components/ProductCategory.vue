<template>
  <div class="card m-4">
    <div class="card-content">
      <div class="content">
        <b-image
          v-if="url"
          class="icon"
          :src="url"
          :alt="`${value.name} Logo`"
        />

        <h6 class="subtitle is-6 mt-auto">
          {{ value.name }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import { getDownloadURL, ref } from 'firebase/storage'

export default {
  name: 'ProductCategory',
  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      url: null
    }
  },
  async fetch () {
    this.url = await getDownloadURL(ref(this.$fire.storage, `categories/${this.value.id}.png`))
  }
}
</script>

<style scoped>
.card {
  width: 12rem;
  height: 12rem;
  text-align: center;
}

.icon {
  margin: 0 auto;
  width: 5rem;
  height: 5rem;
}
</style>
