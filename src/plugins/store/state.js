export default {
  messages: [],
  cuisines: [],
  recipe: {
    levels: [ 'easy', 'medium', 'hard' ],
    times: [ 5, 10, 15, 30, 45, 60, 90, 120, 150, 180, 210, 240 ]
  },
  loggedIn: localStorage.getItem('loggedIn') === 'true',
  currentUser: {},
  user: {}
}
