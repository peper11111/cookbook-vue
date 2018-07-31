<template>
<div class="o-page" v-if="!loading">
  <div class="o-page__wrapper">
    <user-details></user-details>
    <div class="o-page__separator"></div>
    <recipe-list></recipe-list>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'
import { SET_RECIPES, SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserPage',
  components: {
    RecipeList: () => import('@/components/recipe-list'),
    UserDetails: () => import('@/components/user-elements/user-details')
  },
  mixins: [ base ],
  computed: {
    userId () {
      return Number(this.$route.params.id)
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    request () {
      return this.$api.users.read(this.userId).then(value => {
        this.$store.commit(SET_USER, value.data)
      }).then(() => {
        return this.$api.users.recipes(this.userId)
      }).then(value => {
        this.$store.commit(SET_RECIPES, value.data)
      }).catch(reason => {
        if (reason.response.status === 404) {
          this.$router.push('/')
        }
        return Promise.reject(reason)
      })
    }
  }
}
</script>
