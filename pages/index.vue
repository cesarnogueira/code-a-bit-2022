<template>
  <div>
    <b-carousel :pause-hover="false">
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <b-image class="image banner" :src="`https://ik.imagekit.io/rfalcao/v0/b/yummy-b5e1a.appspot.com/o/banners%2F${i + 1}.jpeg?alt=media`" />
      </b-carousel-item>
    </b-carousel>

    <ProductCategories class="mt-6" />

    <div class="container">
      <h1 class="title my-6">
        Eventos locais
      </h1>

      <b-carousel-list v-model="eventsIndex" style="max-width: 728px; margin: 2rem auto;" :data="events" :items-to-show="2">
        <template #item="list">
          <div class="card" style="height: 100%">
            <div class="card-image">
              <figure class="image is-1by1">
                <img :src="list.image">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-5">
                  {{ list.title }}
                </p>
                <p class="subtitle is-6 mt-2">
                  {{ list.description }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </b-carousel-list>
    </div>
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
        { text: 'Slide 1' },
        { text: 'Slide 2' },
        { text: 'Slide 3' },
        { text: 'Slide 4' },
        { text: 'Slide 5' }
      ],

      eventsIndex: 0,
      events: [
        {
          title: 'Ajudar refugiados em portugal',
          image: 'https://aafdl.pt/wp-content/uploads/2021/05/cartaz-refugiados.jpeg',
          description: 'A JRS - serviço jesuítas aos refugiados em Portugal procura voluntários para apoiar famílias refugiadas.'
        },
        {
          title: 'Viagem a Fátima',
          image: 'http://diarioatual.com/wp-content/uploads/2016/08/FB_IMG_1472641927878.jpg',
          description: 'Entrega de Fitas com as preces, aos pés de Nª Sra de Fátima.'
        },
        {
          title: '2º Festival de Sopas',
          image: 'http://correiodeazambuja.pt/wp-content/uploads/2017/10/20171021_festa_sopa_escuteiros_azambuja.png',
          description: 'Degustação de sopas confecionadas e gentilmente oferecidas pelos snack-bares e restaurantes da vila da Azambuja.'
        },
        {
          title: 'Campanha de doação de sangue',
          image: 'http://www.ung.br/sites/ung.br/files/fields/imagemLateral/noticias/2018/06/campanha_de_doacao_de_sangue.jpg',
          description: 'Doe sangue, doe vida!'
        }
      ]
    }
  }
}
</script>

<style scoped>
.banner {
  height: 40vh;
  object-fit: cover;
}
</style>
