<template>
<div
  :class="{ 'is-disabled': disabled }"
  @mouseleave="setVisibleValue(value)"
  class="c-rating-bar"
>
  <div
    v-for="i in size"
    :key="i"
    :class="{ 'is-active': isActive(i) }"
    @mouseenter="setVisibleValue(i)"
    @click="onClick(i)"
    class="c-rating-bar__item"
  >
    <i class="material-icons">
      star
    </i>
  </div>
</div>
</template>

<script>
export default {
  name: 'RatingBar',
  props: {
    disabled: Boolean,
    size: {
      type: Number,
      default: 5
    },
    value: [ String, Number ]
  },
  data () {
    return {
      visibleValue: this.value
    }
  },
  watch: {
    value () {
      this.visibleValue = this.value
    }
  },
  methods: {
    isActive (val) {
      return val <= this.visibleValue
    },
    setVisibleValue (val) {
      if (this.disabled) {
        return
      }
      this.visibleValue = val
    },
    onClick (val) {
      if (this.disabled) {
        return
      }
      this.$emit('input', val !== this.value ? val : null)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.c-rating-bar {
  display: flex;
  align-items: center;
  height: 34px;

  &.is-disabled {
    height: auto;

    .c-rating-bar__item {
      cursor: default;
    }
  }

  &__item {
    @include box-elevation;
    background-color: $color-primary-light;
    border-radius: 50%;
    font-size: 0;
    padding: 4px;
    margin: 0 1px;
    user-select: none;
    cursor: pointer;

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
