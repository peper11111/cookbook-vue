<template>
<div class="c-user-stats">
  <span class="c-user-stats__value">
    {{ user.recipes || 0 }}
  </span>
  <span class="c-user-stats__label">
    {{ $t('user.recipes') }}
  </span>
  <span class="c-user-stats__value">
    {{ user.followers || 0 }}
  </span>
  <span class="c-user-stats__label">
    {{ $t('user.followers') }}
  </span>
  <span class="c-user-stats__value">
    {{ user.followed || 0 }}
  </span>
  <span class="c-user-stats__label">
    {{ $t('user.followed') }}
  </span>
</div>
</template>

<script>
export default {
  name: 'UserStats',
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss">
.c-user-stats {
  display: flex;
  align-items: center;

  &__value {
    padding-left: 16px;
    font-weight: bold;
  }

  &__label {
    padding: 0 16px 0 4px;

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
