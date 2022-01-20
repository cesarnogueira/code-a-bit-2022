<template>
  <div>
    <DashboardShop />

    <section class="section">
      <h2 class="title">
        Produtos
      </h2>

      <b-button
        class="mt-4"
        label="Adicionar novo produto"
        type="is-primary"
        @click="createModal"
      />

      <div class="is-flex is-flex-direction-row is-justify-content-center is-flex-wrap-wrap">
        <ShopProduct v-for="product in products" :key="product.id" :value="product" :allow-purchase="false" :allow-delete="true" />
      </div>

      <b-modal
        v-model="showProductModal"
        has-modal-card
        aria-role="dialog"
        aria-label="Example Modal"
        close-button-aria-label="Close"
        aria-modal
      >
        <template #default="props">
          <form action="">
            <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                <p class="modal-card-title">
                  Adicionar novo produto
                </p>
              </header>
              <section class="modal-card-body">
                <b-field class="file is-primary" :class="{'has-name': !!newProductFile}">
                  <b-upload v-model="newProductFile" class="file-label">
                    <span class="file-cta">
                      <b-icon class="file-icon" icon="upload" />
                      <span class="file-label">Clica para fazer upload</span>
                    </span>
                    <span v-if="newProductFile" class="file-name">
                      {{ newProductFile.name }}
                    </span>
                  </b-upload>
                </b-field>

                <b-field
                  label="Nome"
                >
                  <b-input
                    v-model="newProductName"
                    type="text"
                    maxlength="64"
                  />
                </b-field>

                <b-field label="Categoria">
                  <b-select v-model="newProductCategory" placeholder="Seleciona uma categoria">
                    <option
                      v-for="option in categories"
                      :key="option.id"
                      :value="option.name"
                    >
                      {{ option.name }}
                    </option>
                  </b-select>
                </b-field>

                <b-field
                  label="Descrição"
                >
                  <b-input
                    v-model="newProductDescription"
                    type="text"
                  />
                </b-field>

                <b-field
                  label="Preço"
                >
                  <b-numberinput v-model="newProductPrice" step="0.1" min-step="0.01" :min="0" />
                </b-field>
              </section>
              <footer class="modal-card-foot">
                <b-button
                  label="Fechar"
                  @click="props.close"
                />
                <b-button
                  :disabled="pending"
                  label="Guardar"
                  type="is-primary"
                  native-type="submit"
                  @click.prevent="submit"
                />
              </footer>
            </div>
          </form>
        </template>
      </b-modal>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore'
import { uploadBytes, ref } from 'firebase/storage'
import DashboardShop from '~/components/dashboard/DashboardShop'
import ShopProduct from '~/components/ShopProduct'

export default {
  name: 'DashboardIndexPage',
  components: {
    ShopProduct,
    DashboardShop
  },
  middleware: 'auth',
  data () {
    return {
      categories: [],
      categoriesUnsubscribe: null,

      products: [],
      productsUnsubscribe: null,

      pending: false,
      showProductModal: false,

      newProductFile: null,
      newProductName: '',
      newProductCategory: '',
      newProductDescription: '',
      newProductPrice: 0
    }
  },
  fetch () {
    this.productsUnsubscribe = onSnapshot(collection(this.$fire.db, 'users', this.getAuthUser.uid, 'shop-products'), (changes) => {
      this.products = changes.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data
      })
    })

    this.categoriesUnsubscribe = onSnapshot(collection(this.$fire.db, 'categories'), (changes) => {
      this.categories = changes.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data
      }).sort((a, b) => a.name > b.name ? a : b)
    })
  },
  beforeDestroy () {
    this.categoriesUnsubscribe?.()
    this.productsUnsubscribe?.()
  },
  computed: {
    ...mapGetters('user', [
      'getUser', 'getAuthUser'
      // Here you can import other getters from the products.js
    ])
  },
  methods: {
    createModal () {
      this.newProductFile = null
      this.newProductName = ''
      this.newProductCategory = ''
      this.newProductDescription = ''
      this.newProductPrice = 0
      this.showProductModal = true
    },
    uuidv4 () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    async submit () {
      try {
        this.pending = true
        const id = this.uuidv4()

        await uploadBytes(ref(this.$fire.storage, `products/${id}.png`), this.newProductFile)

        await setDoc(doc(this.$fire.db, 'users', this.getAuthUser.uid, 'shop-products', id), {
          id,
          name: this.newProductName,
          description: this.newProductDescription,
          category: this.newProductCategory,
          price: this.newProductPrice,
          owner: this.getAuthUser.uid
        })

        this.showProductModal = false

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
