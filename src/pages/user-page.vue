<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper o-page__wrapper--top">
    <user-details></user-details>
    <div class="o-page__separator"></div>
    <div class="c-user-page__wrapper">
      <h1 class="c-user-page__header">
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

<style lang="scss">
.c-user-page {
  &__wrapper {
    padding: 0 16px;
  }

  &__header {
    font-size: 24px;
    margin-bottom: -24px;
    padding: 0 16px;
  }
}
</style>
