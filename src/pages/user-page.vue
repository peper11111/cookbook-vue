<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper o-page__wrapper--top">
    <user-details></user-details>
    <div class="o-page__separator"></div>
    <recipe-buttons
      v-model="layout"
      :title="$t('list.recipes')"
    ></recipe-buttons>
    <recipe-list
      :layout="layout"
      :userId="user.id"
      type="user-recipes"
    ></recipe-list>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserPage',
  components: {
    RecipeButtons: () => import('@/components/list/recipe-buttons'),
    RecipeList: () => import('@/components/list/recipe-list'),
    UserDetails: () => import('@/components/user/user-details')
  },
  mixins: [ requester ],
  data () {
    return {
      layout: 'grid'
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.wrap(this.fetchUser())
  },
  methods: {
    fetchUser () {
      return this.$api.users.read(this.$route.params.id).then((value) => {
        this.$store.commit(SET_USER, value.data)
      })
    }
  }
}
</script>
