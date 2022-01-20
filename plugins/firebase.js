import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

export default ({ app, store }, inject) => {
  const config = {
    apiKey: 'AIzaSyAkDQgivPTJ3qdBzZ3-S-PhqHmPOoMFoZo',
    authDomain: 'yummy-b5e1a.firebaseapp.com',
    projectId: 'yummy-b5e1a',
    storageBucket: 'yummy-b5e1a.appspot.com',
    messagingSenderId: '298791932901',
    appId: '1:298791932901:web:2ba473b0021e93ec5cd50c',
    measurementId: 'G-5H7PGG945C'
  }

  const firebaseApp = initializeApp(config)
  const db = getFirestore(firebaseApp, {})
  const auth = getAuth(firebaseApp)
  const storage = getStorage(firebaseApp)

  // Inject $hello(msg) in Vue, context and store.
  inject('fire', {
    db,
    auth,
    storage
  })

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return resolve(store.dispatch('user/setUser', user))
      }
      return resolve()
    })
  })
}
