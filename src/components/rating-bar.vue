<template>
<div
  @mouseleave="clear"
  class="c-rating-bar"
>
  <i
    v-for="i in size"
    :key="i"
    :class="{ 'is-active': visibleValue >= i }"
    @mouseover="visibleValue = i"
    @click="click"
    class="c-rating-bar__star material-icons"
  >
    {{ icon }}
  </i>
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
    size: Number,
    value: Number
  },
  data () {
    return {
      visibleValue: this.value
    }
  },
  methods: {
    click () {
      this.$emit('change', this.visibleValue)
    },
    clear () {
      this.visibleValue = this.value
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.c-rating-bar {
  cursor: pointer;

  &__star {
    @include text-elevation;
    color: $color-secondary;
    font-size: 24px;

    &.is-active {
      color: $text-color-primary;
    }
  }
}
</style>
