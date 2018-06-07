<template>
<div class="c-image-uploader">
  <input
    v-if="editMode"
    ref="input"
    @change="change"
    accept="image/*"
    class="u-hide"
    type="file"
  />
  <img
    :src="src"
    class="c-image-uploader__image"
  />
  <div
    v-if="editMode"
    @click="click"
    class="c-image-uploader__overlay"
  >
    <i class="material-icons">
      camera_alt
    </i>
  </div>
  <div
    v-if="editMode && imgSrc"
    @click="clear"
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
    blankSrc: {
      default: '/static/blank-banner.jpg',
      type: String
    },
    editMode: Boolean,
    imgSrc: [ Number, String ]
  },
  computed: {
    src () {
      return (typeof this.imgSrc === 'number'
        ? this.url(this.imgSrc)
        : this.imgSrc) || this.blankSrc
    }
  },
  methods: {
    click () {
      this.$refs.input.click()
    },
    change () {
      const file = this.$refs.input.files[0]

      if (file) {
        this.$refs.input.value = ''
        if (file.size > 10485760) { // 10MB
          this.showError('error.file-exceeds-limit')
        } else {
          this.$emit('change', {
            src: URL.createObjectURL(file),
            file
          })
        }
      }
    },
    clear () {
      this.$refs.input.value = ''
      this.$emit('change', {
        src: null,
        file: null
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
