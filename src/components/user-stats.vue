<template>
<div class="c-user-stats">
  <span class="c-user-stats__value">
    {{ model.recipes || 0 }}
  </span>
  <span class="c-user-stats__label">
    {{ $t('user.recipes') }}
  </span>
  <span class="c-user-stats__value">
    {{ model.followers || 0 }}
  </span>
  <span class="c-user-stats__label">
    {{ $t('user.followers') }}
  </span>
  <span class="c-user-stats__value">
    {{ model.followed || 0 }}
  </span>
  <span class="c-user-stats__label">
    {{ $t('user.followed') }}
  </span>
</div>
</template>

<script>
export default {
  name: 'UserStats',
  props: {
    model: Object
  }
}
</script>

<style lang="scss">
.c-user-stats {
  display: flex;
  align-items: center;

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
