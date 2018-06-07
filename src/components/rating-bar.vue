<template>
<div
  @mouseleave="clear"
  class="c-rating-bar"
>
  <i
    v-for="i in stars"
    :key="i"
    @mouseover="visibleValue = i"
    @click="click"
    class="c-rating-bar__star material-icons"
  >
    {{ visibleValue >= i ? 'star' : 'star_border' }}
  </i>
</div>
</template>

<script>
export default {
  name: 'RatingBar',
  props: {
    stars: Number,
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
    color: $color-white;
    font-size: 24px;
  }
}
</style>
