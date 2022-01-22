<template>
  <nuxt-link class="card m-4" :to="`/categories/${value.name}`">
    <div class="card-content">
      <div class="content">
        <b-image
          class="icon"
          :src="`https://ik.imagekit.io/rfalcao/v0/b/yummy-b5e1a.appspot.com/o/categories%2F${value.id}.png?alt=media`"
          :alt="`${value.name} Logo`"
        />

        <h6 class="subtitle is-6 mt-auto">
          {{ value.name }}
        </h6>
      </div>
    </div>
  </nuxt-link>
</template>

<script>

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
