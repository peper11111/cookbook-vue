<template>
<div class="c-image-uploader">
  <input
    v-if="!disabled"
    ref="input"
    @input="emitEvent($event.target.files[0])"
    accept="image/*"
    class="u-hide"
    type="file"
  />
  <img
    :src="value || blank"
    class="c-image-uploader__image"
  />
  <div
    v-if="!disabled"
    @click="triggerInput()"
    class="c-image-uploader__overlay"
  >
    <i class="material-icons">
      camera_alt
    </i>
  </div>
  <div
    v-if="!disabled && value"
    @click="emitEvent(null)"
    class="c-image-uploader__clear"
  >
    <i class="material-icons">
      clear
    </i>
  </div>
</div>
</template>

<script>
const FILE_SIZE_LIMIT = 10485760 // 10MB

export default {
  name: 'ImagePicker',
  components: {
    ImageModal: () => import('@/components/form/image-modal')
  },
  props: {
    blank: {
      type: String,
      default: '/static/blank-banner.jpg'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: String
  },
  methods: {
    triggerInput () {
      this.$refs.input.click()
    },
    emitEvent (file) {
      if (this.disabled) {
        return
      }

      if (file && file.size > FILE_SIZE_LIMIT) {
        this.$notify.error('file-exceeds-limit')
        return
      }

      const value = file ? URL.createObjectURL(file) : null
      this.$emit('input', value)
      this.$emit('file', file)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.c-image-uploader {
  position: relative;
  user-select: none;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: inherit;
  }

  &__overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    opacity: 0;
    border-radius: inherit;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    .material-icons {
      @include text-elevation;
      font-size: 32px;
      color: $color-white;
    }
  }

  &__clear {
    @include box-elevation;
    position: absolute;
    top: 12px;
    right: 12px;
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
