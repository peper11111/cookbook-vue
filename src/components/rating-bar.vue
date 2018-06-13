<template>
<div
  @mouseleave="resetValue"
  class="c-rating-bar"
>
  <div
    v-for="i in 5"
    :key="i"
    :class="{ 'is-active': isActive(i) }"
    @mouseover="setValue(i)"
    @click="emitValue"
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
    value: Number
  },
  data () {
    return {
      model: {
        value: this.value
      }
    }
  },
  watch: {
    value: 'setValue'
  },
  methods: {
    isActive (val) {
      return this.model.value >= val
    },
    emitValue () {
      this.$emit('input', this.model.value)
    },
    resetValue () {
      this.model.value = this.value
    },
    setValue (val) {
      this.model.value = val
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
