<template>
<div
  @click.stop
  class="c-app-dropdown"
>
  <slot name="body"></slot>
</div>
</template>

<script>
export default {
  name: 'AppDropdown',
  mounted () {
    window.addEventListener('click', this.close)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.close)
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.c-app-dropdown {
  @include box-elevation;
  background-color: $color-white;
  border-radius: 2px;
  user-select: none;
  z-index: 1001;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -10px;
    right: 10px;

    border: 5px solid transparent;
    border-bottom-color: $color-white;
    box-sizing: border-box;
  }
}
</style>
