import { getFirestore, onSnapshot, doc } from 'firebase/firestore'

export const state = () => ({
  authUser: null,
  user: null,
  userUnsubscribe: null
})

export const actions = {
  setUser: ({ state, commit }, user) => {
    if (user) {
      const { name, uid, email, emailVerified } = user

      const unsubscribe = onSnapshot(doc(getFirestore(), 'users', uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data()
          data.id = doc.id
          commit('setUser', data)
        }
      })

      commit('setAuthUser', {
        user: { name, uid, email, emailVerified },
        unsubscribe
      })
    } else {
      commit('setAuthUser', {
        user: null,
        unsubscribe: null
      })
      commit('user/setUser', null)
    }
  }
}

export const mutations = {
  setAuthUser: (state, { user, unsubscribe }) => {
    state.authUser = user
    state.userUnsubscribe?.()
    state.userUnsubscribe = unsubscribe
  },
  setUser: (state, user) => {
    state.user = user
  }
}

export const getters = {
  isLoggedIn: (state) => {
    return !!state.user
  },
  getAuthUser: (state) => {
    return state.authUser
  },
  getUser: (state) => {
    return state.user
  }
}
