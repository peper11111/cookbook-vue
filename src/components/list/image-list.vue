<template>
<div class="c-image-list">
  <div
    @scroll="onScroll"
    ref="wrapper"
    class="c-image-list__wrapper"
  >
    <input
      ref="input"
      @input="wrap(uploadImage($event))"
      accept="image/*"
      class="u-hide"
      type="file"
    />
    <div
      @click="triggerInput"
      class="c-image-list__new"
    >
      <i class="material-icons">
        add_circle_outline
      </i>
    </div>
    <image-item
      v-for="image in images"
      :key="image.id"
      :image="image"
      :selected="value === image.id"
      @delete="wrap(deleteImage(image.id))"
      @select="selectImage(image.id)"
    ></image-item>
  </div>
</div>
</template>

<script>
import config from '@/config'
import requester from '@/mixins/requester'
import { ADD_IMAGES, SET_IMAGES } from '@/store/mutation-types'

export default {
  name: 'ImageList',
  components: {
    ImageItem: () => import('@/components/list/image-item')
  },
  mixins: [ requester ],
  props: {
    value: Number
  },
  data () {
    return {
      done: false,
      page: 1
    }
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    },
    images () {
      return this.$store.state.images
    }
  },
  created () {
    this.wrap(this.init())
  },
  methods: {
    init () {
      this.page = 1
      this.done = false
      this.$store.commit(SET_IMAGES, [])
      return this.fetchImages()
    },
    triggerInput () {
      this.$refs.input.click()
    },
    onScroll () {
      if (this.pending || this.done) {
        return
      }
      if (this.$refs.wrapper.offsetHeight + this.$refs.wrapper.scrollTop >= this.$refs.wrapper.scrollHeight - 300) {
        this.wrap(this.fetchImages())
      }
    },
    fetchImages () {
      return this.$api.users.readImages(this.authUser.id, { page: this.page++ }).then((value) => {
        this.$store.commit(ADD_IMAGES, value.data)
        if (value.data.length < config.pageSize) {
          this.done = true
        }
      })
    },
    selectImage (id) {
      this.$emit('input', id)
    },
    deleteImage (id) {
      if (!confirm(this.$t('list.image-delete'))) {
        return Promise.resolve()
      }
      if (this.value === id) {
        this.$emit('input', null)
      }
      return this.$api.uploads.delete(id).then(() => {
        this.$notify.success('image-deleted')
        this.init()
      })
    },
    uploadImage (event) {
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
    height: calc(100% - 88px);
    overflow-y: auto;
    align-content: flex-start;
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
