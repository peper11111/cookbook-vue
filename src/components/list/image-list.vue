<template>
<div class="c-image-list">
  <input
    ref="input"
    @input="uploadImage"
    accept="image/*"
    class="u-hide"
    type="file"
  />
  <div class="c-image-list__wrapper">
    <div
      @click="triggerInput"
      class="c-image-list__new"
    >
      <i class="material-icons">
        add_circle_outline
      </i>
    </div>
    <image-item
      v-for="image in items"
      :key="image.id"
      :image="image"
      :selected="value === image.id"
      @delete="deleteImage(image.id)"
      @select="selectImage(image.id)"
    ></image-item>
  </div>
</div>
</template>

<script>
import config from '@/config'
import scroll from '@/mixins/scroll'

export default {
  name: 'ImageList',
  components: {
    ImageItem: () => import('@/components/list/image-item')
  },
  mixins: [ scroll ],
  props: {
    type: String,
    value: Number
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    getFetchMethod () {
      switch (this.type) {
        case 'user-images':
          return this.$api.users.readImages(this.authUser.id, { page: this.page })
        default:
          return Promise.resolve({data: []})
      }
    },
    triggerInput () {
      this.$refs.input.click()
    },
    selectImage (id) {
      this.$emit('input', id)
    },
    deleteImage (id) {
      this.wrap(() => {
        if (!confirm(this.$t('list.image-delete'))) {
          return Promise.resolve()
        }
        if (this.value === id) {
          this.$emit('input', null)
        }
        return this.$api.uploads.delete(id).then(() => {
          this.$notify.success('image-deleted')
        })
      }).then(() => {
        this.init()
      })
    },
    uploadImage (event) {
      this.wrap(() => {
        const file = event.target.files[0]
        if (!file) {
          return Promise.resolve()
        }
        if (file.size > config.maxFileSize) {
          this.$notify.error('file-exceeds-limit')
          return Promise.resolve()
        }
        event.target.value = null
        const formData = new FormData()
        formData.set('file', file)
        return this.$api.uploads.create(formData).then(() => {
          this.$notify.success('image-created')
        })
      }).then(() => {
        this.init()
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-image-list {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -16px;
  }

  &__new {
    @include box-elevation;
    @include box-elevation-hover;
    width: 200px;
    height: 200px;
    margin: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .material-icons {
      font-size: 64px;
      color: $color-text-primary;
    }
  }
}
</style>
