<template>
<div class="c-user-details">
  <image-picker
    v-model="banner"
    :disabled="!editMode"
    class="c-user-details__banner"
  ></image-picker>
  <div class="c-user-details__wrapper">
    <image-picker
      v-model="avatar"
      :blank="'/static/blank-avatar.jpg'"
      :disabled="!editMode"
      class="c-user-details__avatar"
    ></image-picker>
    <div class="c-user-details__content">
      <div class="c-user-details__row">
        <h1 class="c-user-details__username">
          {{ user.username }}
        </h1>
        <user-buttons
          :editMode="editMode"
          @click="clickAction"
        ></user-buttons>
      </div>
      <div class="c-user-details__row">
          <span class="c-user-details__value">
            {{ user.recipes || 0 }}
          </span>
          <span class="c-user-details__label">
            {{ $t('user.recipes') }}
          </span>
          <span class="c-user-details__value">
            {{ user.followers || 0 }}
          </span>
          <span class="c-user-details__label">
            {{ $t('user.followers') }}
          </span>
          <span class="c-user-details__value">
            {{ user.followed || 0 }}
          </span>
          <span class="c-user-details__label">
            {{ $t('user.followed') }}
          </span>
      </div>
      <div class="c-user-details__row">
        <textarea
          v-model="description"
          :disabled="!editMode"
          :placeholder="editMode ? $t('user.description') : ''"
          class="o-form__textarea c-user-details__description"
          rows="3"
          maxlength="255"
        >
        </textarea>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'
import details from '@/mixins/details'

export default {
  name: 'UserDetails',
  components: {
    ImagePicker: () => import('@/components/image-picker'),
    UserButtons: () => import('@/components/user-buttons')
  },
  mixins: [ base, details ],
  data () {
    return {
      avatar: {},
      banner: {},
      description: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    init () {
      this.avatar = {
        id: this.user.avatarId,
        file: null,
        src: this.url(this.user.avatarId)
      }
      this.banner = {
        id: this.user.bannerId,
        file: null,
        src: this.url(this.user.bannerId)
      }
      this.description = this.user.description
    },
    update () {
      this.uploadImg(this.avatar).then(() => {
        return this.uploadImg(this.banner)
      }).then(() => {
        return this.$api.users.modify(this.user.id, {
          avatarId: this.avatar.id,
          bannerId: this.banner.id,
          description: this.description
        })
      }).then(() => {
        if (this.user.bannerId && this.user.bannerId !== this.banner.id) {
          this.$api.uploads.delete(this.user.bannerId)
        }
        if (this.user.avatarId && this.user.avatarId !== this.avatar.id) {
          this.$api.uploads.delete(this.user.avatarId)
        }
        return this.$api.users.read(this.user.id)
      }).then(value => {
        this.$store.commit('setUser', value.data)
        this.showInfo('info.profile-update-successful')
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.c-user-details {
  &__banner {
    width: 100%;
    height: 300px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    padding: 32px 32px 0 32px;
    box-sizing: border-box;
  }

  &__avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: -75px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 150px);
    box-sizing: border-box;
    padding-left: 32px;
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__username {
    margin-right: 8px;
    font-size: 24px;
  }

  &__value {
    font-weight: bold;
  }

  &__label {
    padding: 0 32px 0 4px;

    &:last-child {
      padding-right: 0;
    }
  }

  &__description[disabled] {
    background: none;
    border-color: transparent;
  }
}
</style>
