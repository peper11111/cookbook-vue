<template>
<div class="c-image-list">
  <div
    @click="$emit('close')"
    class="c-image-list__overlay"
  ></div>
  <div class="c-image-list__body">
    <h1 class="c-image-list__title">
      {{ $t('grid.images') }}
    </h1>
    <div
      @scroll="onScroll"
      ref="wrapper"
      class="c-image-list__wrapper"
    >
      <input
        ref="input"
        @input="onInput($event.target.files[0])"
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
        :selected="selected === image.id"
        @delete="onDelete(image.id)"
        @select="onSelect(image.id)"
      ></image-item>
    </div>
    <div class="c-image-list__buttons">
      <div
        :class="{ 'is-disabled': !selected }"
        class="o-button o-button__accent"
      >
        {{ $t('global.select') }}
      </div>
      <div
        @click="$emit('close')"
        class="o-button o-button__primary"
      >
        {{ $t('global.cancel') }}
      </div>
    </div>
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
      page: 1,
      selected: null
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
    triggerInput () {
      this.$refs.input.click()
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
    onSelect (id) {
      this.selected = id !== this.selected ? id : null
    },
    onDelete (id) {
      if (confirm(this.$t('grid.image-delete'))) {
        this.wrap(this.deleteImage, id)
      }
    },
    deleteImage (id) {
      return this.$api.uploads.delete(id).then(() => {
        this.$notify.success('image-deleted')
        return this.init()
      })
    },
    onInput (file) {
      if (file && file.size > config.maxFileSize) {
        this.$notify.error('file-exceeds-limit')
        return
      }
      this.$refs.input.value = null
      this.wrap(this.uploadImage, file)
    },
    uploadImage (file) {
      const formData = new FormData()
      formData.set('file', file)
      return this.$api.uploads.create(formData).then(() => {
        this.$notify.success('image-created')
        return this.init()
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-image-list {
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
    padding: 32px 16px 16px;
  }

  &__title {
    font-size: 24px;
    margin-left: 16px;
    margin-bottom: 16px;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 88px);
    overflow-y: auto;
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

  &__buttons {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
