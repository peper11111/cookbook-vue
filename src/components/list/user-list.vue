<template>
<div class="c-user-list">
  <user-item
    v-for="user in items"
    :key="user.id"
    :user="user"
  ></user-item>
</div>
</template>

<script>
import scroll from '@/mixins/scroll'

export default {
  name: 'UserList',
  components: {
    UserItem: () => import('@/components/list/user-item')
  },
  mixins: [ scroll ],
  props: {
    type: String
  },
  watch: {
    query () {
      this.init()
    }
  },
  computed: {
    query () {
      return this.$route.query.query
    }
  },
  methods: {
    getFetchMethod () {
      switch (this.type) {
        case 'users-search':
          return this.$api.users.search({ query: this.query, page: this.page++ })
        default:
          return Promise.resolve({ data: [] })
      }
    }
  }
}
</script>

<style lang="scss">
.c-user-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
