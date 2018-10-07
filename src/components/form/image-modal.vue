<template>
<div
  @click.stop="emitEvent('close')"
  class="c-image-modal"
>
</div>
</template>

<script>
export default {
  name: 'ImageModal',
  methods: {
    emitEvent (type) {
      this.$emit(type)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-image-modal {
  @include box-elevation;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  z-index: 1001;
}
</style>
