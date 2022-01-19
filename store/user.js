export const state = () => ({
  user: null
})

export const mutations = {
  setUser: (state, user) => {
    if (user) {
      const { name, uid, email, emailVerified } = user
      state.user = { name, uid, email, emailVerified }
    } else {
      state.user = null
    }
  }
}

export const getters = {
  isLoggedIn: (state) => {
    return !!state.user
  }
}
