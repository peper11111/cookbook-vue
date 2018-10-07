export default {
  auth: {
    loggedIn: localStorage.getItem('loggedIn') === 'true',
    user: {}
  },
  types: {
    categories: [],
    cuisines: []
  },
  user: {},
  recipe: {},
  recipes: [],
  images: []
}
