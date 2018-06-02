<template>
<div class="c-image-uploader">
  <input
    v-if="editMode"
    ref="input"
    @change="upload"
    accept="image/*"
    class="u-hide"
    type="file"
  />
  <img
    :src="imgSrc"
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
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'ImageUploader',
  mixins: [ base ],
  props: {
    editMode: Boolean,
    imgSrc: String
  },
  methods: {
    click () {
      this.$refs.input.click()
    },
    upload () {
      const file = this.$refs.input.files[0]

      if (file && file.size > 10485760) { // 10MB
        this.showError('error.file-exceeds-limit')
        this.$refs.input.value = ''
        return
      }

      const formData = new FormData()
      formData.set('file', file)
      this.$api.uploads.create(formData).then(value => {
        this.$emit('imageUpload', value.data)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

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
}
</style>
