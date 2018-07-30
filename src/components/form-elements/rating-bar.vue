<template>
<div
  :class="{ 'is-disabled': disabled }"
  @mouseleave="setVisibleValue(localValue)"
  class="c-rating-bar"
>
  <div
    v-for="i in size"
    :key="i"
    :class="{ 'is-active': isActive(i) }"
    @mouseenter="setVisibleValue(i)"
    @click="setLocalValue(i)"
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
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 5
    },
    value: Number
  },
  data () {
    return {
      localValue: this.value,
      visibleValue: this.value
    }
  },
  watch: {
    value (val) {
      this.localValue = val
      this.visibleValue = val
    }
  },
  methods: {
    isActive (val) {
      return val <= this.visibleValue
    },
    setLocalValue (val) {
      if (this.disabled) {
        return
      }
      this.localValue = val
      this.$emit('input', this.localValue)
    },
    setVisibleValue (val) {
      if (this.disabled) {
        return
      }
      this.visibleValue = val
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

  &.is-disabled {
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
