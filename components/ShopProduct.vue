<template>
  <div class="card m-4 is-flex is-flex-direction-column">
    <div class="card-image">
      <b-image v-if="url" :src="url" :alt="`${value.name} Icon`" ratio="3by2" style="margin: 0;" />
    </div>
    <div class="card-content is-flex-grow-1">
      <div class="media">
        <div class="media-content">
          <p v-if="showAuthor && owner" class="is-7 has-text-weight-bold">
            {{ owner.shop.name || '' }}
            <span v-if="isOwned"> (seu)</span>
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

    <footer v-if="allowPurchase && !isOwned" class="card-footer p-2">
      <b-field>
        <p class="control">
          <b-button label="Comprar" @click="buy" />
        </p>

        <b-numberinput v-model="quantity" :min="1" expanded controls-position="compact" controls-alignment="right" />
      </b-field>
    </footer>

    <footer v-if="allowDelete && isOwned" class="card-footer p-2">
      <b-button
        label="Eliminar"
        type="is-danger"
        :disabled="pending"
        @click="deleteProduct"
      />
    </footer>

    <b-modal
      v-model="showModal"
      has-modal-card
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default>
        <div id="dynamic-forms-container" />
      </template>
    </b-modal>
  </div>
</template>

<script>
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
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
    },
    allowPurchase: {
      type: Boolean,
      default: true
    },
    allowDelete: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pending: false,
      showModal: false,

      url: null,
      owner: null,
      quantity: 1
    }
  },
  async fetch () {
    const data = await getDoc(doc(this.$fire.db, 'users', this.value.owner))
    if (data.exists()) {
      this.owner = data.data()
    }

    this.url = await getDownloadURL(ref(this.$fire.storage, `products/${this.value.id}.png`))
  },
  computed: {
    isOwned () {
      return this.value.owner === this.$store.getters['user/getAuthUser']?.uid
    }
  },
  methods: {
    buy () {
      this.pending = true
      this.showModal = true

      this.$nextTick(() => {
        try {
          const formContainer = document.getElementById('dynamic-forms-container')
          const formOptions = {
            chargesUrl: 'https://europe-west1-yummy-b5e1a.cloudfunctions.net/switchAPI',
            merchantTransactionId: `${this.value.id};${this.quantity}`,
            theme: 'material',
            iframe: true,
            showReference: true,
            language: 'pt',
            customStyles: {
              global: {
                padding: '0.5rem'
              },
              colors: {
                background: 'white'
              },
              formField: { margin: '1rem' }
            }
          }

          // eslint-disable-next-line no-undef
          const switchJs = new SwitchJs(SwitchJs.environments.TEST, 'AY1NAHUkocpVMIag9i8xfOlDPBEjVUJMuwgmsEQHFzApwS2tmwhAousPm4XC0tl')
          switchJs.dynamicForms(formContainer, formOptions)

          this.$buefy.toast.open('Sucesso!')
        } catch (e) {
          this.$buefy.toast.open(`Error: ${e}`)
        } finally {
          this.pending = false
        }
      })
    },
    deleteProduct () {
      this.$buefy.dialog.confirm({
        title: 'Eliminar este produto?',
        message: 'Esta ação é irreversível.',
        cancelText: 'Cancelar',
        confirmText: 'Confirmar',
        type: 'is-danger',
        onConfirm: this.confirmDeleteProduct
      })
    },
    async confirmDeleteProduct () {
      try {
        this.pending = true
        await deleteDoc(doc(this.$fire.db, 'users', this.$store.getters['user/getAuthUser'].uid, 'shop-products', this.value.id))

        this.showDeleteModal = false

        this.$buefy.toast.open('Sucesso!')
      } catch (e) {
        this.$buefy.toast.open(`Error: ${e}`)
      } finally {
        this.pending = false
      }
    }
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

<style>
.modal-background {
  z-index: -1;
}
</style>
