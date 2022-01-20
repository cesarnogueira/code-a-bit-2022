<template>
  <section class="section">
    <div class="container">
      <div class="is-flex is-flex-direction-row is-justify-content-center is-align-items-center">
        <figure class="image is-1200x800 m-6 br">
          <img
            :src="require('@/assets/about.jpeg')"
            style="width: 200rem; border-radius: 0.5rem"
          >
        </figure>

        <div>
          <h1 class="title">
            Sobre nós
          </h1>

          <p>
            Por muito que seja simples encomendar comida, ter alguém que a cozinhe por gosto será sempre mais saboroso. Nós
            não estabelecemos comércio apenas, nós conectamos pessoas, vidas, experiências. No fundo o que interessa não se
            reduz à experiência do cliente e do vendedor, é proporcionar uma experiência única entre ambos. O projeto nasce
            da ideia de levar a outro nível o alcance de alguém que confecione alimentos e se sente limitado. A nossa equipa
            propõe-se a dar a oportunidade de se conhecer novos produtos, novas pessoas e novas vidas oferecendo à
            comunidade aquilo que a tecnologia lhe tem retirado.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>
