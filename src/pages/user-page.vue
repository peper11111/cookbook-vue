<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <user-profile :id="userId"></user-profile>
    <hr class="o-page__separator"/>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'UserPage',
  components: {
    UserProfile: () => import('@/components/user-profile')
  },
  mixins: [ base ],
  data () {
    return {
      loading: false,
      userDetails: {}
    }
  },
  computed: {
    userId () {
      return Number(this.$route.params.id)
    }
  }
}
</script>
