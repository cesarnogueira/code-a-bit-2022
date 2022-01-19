export default ({ app, redirect, store }) => {
  if (!store.state.user) {
    return redirect('/auth/login')
  }
}
