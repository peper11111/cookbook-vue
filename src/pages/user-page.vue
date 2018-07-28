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

export default {
  name: 'UserPage',
  components: {
    RecipeList: () => import('@/components/recipe-list'),
    UserDetails: () => import('@/components/user-details')
  },
  mixins: [ base ],
  created () {
    this.fetch()
  },
  methods: {
    request () {
      return this.$api.users.read(this.$route.params.id).then(value => {
        this.$store.commit('setUser', value.data)
      }).catch(reason => {
        if (reason.response.status === 404) {
          this.$router.push('/')
        }
      }).then(() => {
        return this.$api.users.recipes(this.$route.params.id)
      })
    }
  }
}
</script>
