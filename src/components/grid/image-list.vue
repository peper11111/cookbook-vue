<template>
<div class="c-image-list">
  <h1 class="c-image-list__title">
    {{ $t('grid.images') }}
  </h1>
  <div
    @scroll="onScroll"
    ref="wrapper"
    class="c-image-list__wrapper"
  >
    <image-item
      v-for="image in images"
      :key="image.id"
      :image="image"
      @delete="onDelete(image.id)"
    ></image-item>
  </div>
</div>
</template>

<script>
import config from '@/config'
import requester from '@/mixins/requester'
import { ADD_IMAGES, REMOVE_IMAGES } from '@/store/mutation-types'

export default {
  name: 'ImageList',
  components: {
    ImageItem: () => import('@/components/grid/image-item')
  },
  mixins: [ requester ],
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
    this.wrap(this.init)
  },
  methods: {
    init () {
      this.page = 1
      this.done = false
      this.$store.commit(REMOVE_IMAGES)
      return this.fetchImages()
    },
    onScroll () {
      if (this.pending || this.done) {
        return
      }
      if (this.$refs.wrapper.offsetHeight + this.$refs.wrapper.scrollTop >= this.$refs.wrapper.scrollHeight - 300) {
        this.wrap(this.fetchImages)
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
    onDelete (id) {
      if (confirm(this.$t('grid.image-delete'))) {
        this.wrap(this.deleteImage, id)
      }
    },
    deleteImage (id) {
      return this.$api.uploads.delete(id).then(() => {
        return this.init()
      })
    }
  }
}
</script>

<style lang="scss">
.c-image-list {
  height: 100%;

  &__title {
    font-size: 24px;
    margin-left: 16px;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 24px);
    overflow-y: auto;
  }
}
</style>
