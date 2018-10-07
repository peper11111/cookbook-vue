<template>
<div
  @click.stop
  class="c-image-modal"
>
  <div
    @click="$emit('close')"
    class="c-image-modal__overlay"
  ></div>
  <div class="c-image-modal__body">
    <i
      @click="$emit('close')"
      class="material-icons c-image-modal__close"
    >
      close
    </i>
    <image-list></image-list>
  </div>
</div>
</template>

<script>
export default {
  name: 'ImageModal',
  components: {
    ImageList: () => import('@/components/grid/image-list')
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.25);
  }

  &__body {
    @include box-elevation;
    position: absolute;
    width: 1000px;
    left: 0;
    right: 0;
    top: 5%;
    bottom: 5%;
    margin: auto;
    background-color: $color-white;
    border-radius: 2px;
    padding: 32px 16px;
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 16px;
    color: $color-text-secondary;
    cursor: pointer;

    &:hover {
      color: $color-text-primary;
    }
  }
}
</style>
