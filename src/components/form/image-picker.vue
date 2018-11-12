<template>
<div class="c-image-picker">
  <img
    :src="bannerSrc"
    class="c-image-picker__image"
  />
  <div
    v-if="!disabled"
    @click="showModal"
    class="c-image-picker__overlay"
  >
    <i class="material-icons">
      camera_alt
    </i>
  </div>
  <div
    v-if="!disabled && value"
    @click="$emit('input')"
    class="c-image-picker__clear"
  >
    <i class="material-icons">
      clear
    </i>
  </div>
  <app-modal
    v-if="modalVisible"
    @close="hideModal"
  >
    <h1 slot="header">
      {{ $t('list.images') }}
    </h1>
    <image-list
      slot="body"
      v-model="selected"
      type="user-images"
    ></image-list>
    <div slot="footer">
      <div
        @click="hideModal"
        class="o-button o-button__primary"
      >
        {{ $t('global.cancel') }}
      </div>
      <div
        @click="onInput"
        class="o-button o-button__accent"
      >
        {{ $t('global.select') }}
      </div>
    </div>
  </app-modal>
</div>
</template>

<script>
export default {
  name: 'ImagePicker',
  components: {
    AppModal: () => import('@/components/app-modal'),
    ImageList: () => import('@/components/list/image-list')
  },
  props: {
    blank: String,
    disabled: Boolean,
    value: Number
  },
  data () {
    return {
      selected: this.value,
      modalVisible: false
    }
  },
  computed: {
    bannerSrc () {
      return this.$helpers.imageSrc(this.value) || this.blank
    }
  },
  watch: {
    value (val) {
      this.selected = val
    }
  },
  methods: {
    onInput () {
      this.hideModal()
      this.$emit('input', this.selected)
    },
    showModal () {
      this.modalVisible = true
    },
    hideModal () {
      this.modalVisible = false
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.c-image-picker {
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
