<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper">
    <user-details></user-details>
    <div class="o-page__separator"></div>
    <div class="o-page__container">
      <h1 class="o-typography__header o-typography__header--list">
        {{ $t('list.recipes') }}
      </h1>
      <recipe-list
        :userId="user.id"
        type="user-recipes"
      ></recipe-list>
    </div>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserPage',
  components: {
    RecipeList: () => import('@/components/list/recipe-list'),
    UserDetails: () => import('@/components/user/user-details')
  },
  mixins: [ requester ],
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.wrap(() => {
        return this.$api.users.read(this.$route.params.id).then((value) => {
          this.$store.commit(SET_USER, value.data)
        })
      })
    }
  }
}
</script>
