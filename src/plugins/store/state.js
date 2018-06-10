export default {
  messages: [],
  loggedIn: localStorage.getItem('loggedIn') === 'true',
  currentUser: {},
  user: {},
  recipe: {},
  cuisines: [],
  times: [ 5, 10, 15, 30, 45, 60, 90, 120, 150, 180, 240, 300 ]
}
