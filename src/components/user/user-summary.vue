<template>
<div class="c-user-summary">
  <span class="c-user-summary__value">
    {{ user.recipesCount || 0 }}
  </span>
  <span class="c-user-summary__label">
    {{ $t('user.recipes') }}
  </span>
  <span class="c-user-summary__value">
    {{ user.followersCount || 0 }}
  </span>
  <span class="c-user-summary__label">
    {{ $t('user.followers') }}
  </span>
  <span class="c-user-summary__value">
    {{ user.followedCount || 0 }}
  </span>
  <span class="c-user-summary__label">
    {{ $t('user.followed') }}
  </span>
</div>
</template>

<script>
export default {
  name: 'UserSummary',
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss">
.c-user-summary {
  &__value {
    font-weight: bold;
  }

  &__label {
    padding: 0 32px 0 4px;

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
