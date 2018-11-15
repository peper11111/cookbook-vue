<template>
<div
  v-if="items.length !== 0"
  class="c-user-list"
>
  <user-item
    v-for="user in items"
    :key="user.id"
    :user="user"
  ></user-item>
</div>
<div
  v-else
  class="c-user-list__text"
>
  {{ $t('list.no-users') }}
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
      return this.$route.query
    }
  },
  methods: {
    getFetchMethod () {
      switch (this.type) {
        case 'users-search':
          return this.$api.users.search({ ...this.query, page: this.page })
        default:
          return Promise.resolve({ data: [] })
      }
    }
  }
}
</script>

<style lang="scss">
.c-user-list {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -16px;
  }

  &__text {
    margin-top: 24px;
    text-align: center;
  }
}
</style>
