<template>
<div
  :class="{ 'is-selected': selected }"
  class="c-image-item"
>
  <img
    :src="bannerSrc"
    @click="$emit('select')"
    class="c-image-item__image"
  />
  <div
    @click="$emit('delete')"
    class="c-image-item__delete"
  >
    <i class="material-icons">
      clear
    </i>
  </div>
</div>
</template>

<script>
export default {
  name: 'ImageItem',
  props: {
    image: Object,
    selected: Boolean
  },
  computed: {
    bannerSrc () {
      return this.$helpers.thumbnailSrc(this.image.id)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-image-item {
  @include box-elevation;
  @include box-elevation-hover;
  width: 200px;
  height: 200px;
  margin: 16px;
  cursor: pointer;
  position: relative;

  &.is-selected {
    box-shadow: 0 0 0 3px $color-accent;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__delete {
    @include box-elevation;
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 0;
    cursor: pointer;
    background-color: $color-white;
    border-radius: 50%;
    padding: 4px;

    .material-icons {
      font-size: 12px;
    }
  }
}
</style>
