<template>
<div class="c-image-uploader">
  <input
    v-if="editMode"
    ref="input"
    @change="inputChange"
    accept="image/*"
    class="u-hide"
    type="file"
  />
  <img
    :src="model.src || model.blank"
    class="c-image-uploader__image"
  />
  <div
    v-if="editMode"
    @click="inputClick"
    class="c-image-uploader__overlay"
  >
    <i class="material-icons">
      camera_alt
    </i>
  </div>
  <div
    v-if="editMode && model.src"
    @click="inputClear"
    class="c-image-uploader__clear"
  >
    <i class="material-icons">
      clear
    </i>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'ImageUploader',
  mixins: [ base ],
  props: {
    editMode: Boolean,
    model: Object
  },
  methods: {
    inputClick () {
      this.$refs.input.click()
    },
    inputChange () {
      const file = this.$refs.input.files[0]

      if (file) {
        this.$refs.input.value = ''
        if (file.size > 10485760) { // 10MB
          this.showError('error.file-exceeds-limit')
        } else {
          this.$emit('change', {
            blank: this.model.blank,
            file,
            src: URL.createObjectURL(file)
          })
        }
      }
    },
    inputClear () {
      this.$refs.input.value = ''
      this.$emit('change', {
        blank: this.model.blank,
        file: null,
        src: null
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

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
      font-size: 32px;
      color: $color-white;
    }
  }

  &__clear {
    @include elevation;
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
