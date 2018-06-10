<template>
<div
  @mouseleave="clear"
  class="c-rating-bar"
>
  <div
    v-for="i in size"
    :key="i"
    :class="{ 'is-active': currentValue >= i }"
    @mouseover="currentValue = i"
    @click="click"
    class="c-rating-bar__item"
  >
    <i class="material-icons">
      {{ icon }}
    </i>
  </div>
</div>
</template>

<script>
export default {
  name: 'RatingBar',
  props: {
    icon: {
      default: 'star',
      type: String
    },
    size: {
      default: 5,
      type: Number
    },
    value: Number
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    click () {
      this.$emit('input', this.currentValue)
    },
    clear () {
      this.currentValue = this.value
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.c-rating-bar {
  display: flex;
  justify-content: center;

  &__item {
    @include box-elevation;
    background-color: $color-primary-light;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0;
    padding: 4px;
    margin: 0 1px;

    .material-icons {
      font-size: 12px;
      color: $color-text-secondary;
    }

    &.is-active {
      background-color: $color-accent;

      .material-icons {
        color: $color-text;
      }
    }
  }
}
</style>
