<template>
  <form action="" class="box">
    <b-field
      label="Nome completo"
    >
      <b-input
        v-model="name"
        type="text"
        maxlength="64"
      />
    </b-field>
  </form>
</template>

<script>
export default {
  name: 'DashboardShop'
}
</script>

<style scoped>

</style>
