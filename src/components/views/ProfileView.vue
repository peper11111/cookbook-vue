<template>
<div class="profile-view view" v-if="!loading">
  <div class="view__wrapper">
    <div class="profile">
      <div class="profile__image" @click="triggerAvatar()">
        <img :src="currentUser.avatar ? url(currentUser.avatar) : '/static/blank-profile.jpg'">
        <input type="file" accept="image/*" style="display: none" ref="avatar" @change="uploadAvatar()"/>
        <div class="profile__overlay">
          <i class="material-icons">camera_alt</i>
        </div>
      </div>
      <div class="profile__content">
        <div class="profile__row">
          <span class="typography__header" v-text="currentUser.username"></span>
          <div class="profile__button button button--border" v-text="$t('profile.edit')"></div>
          <div class="icon-button" ref="toggle" @click.stop="toggleDropdown()">
            <i class="material-icons" >more_vert</i>
          </div>
          <ul class="dropdown dropdown--list" ref="dropdown">
            <li v-text="$t('profile.add-recipe')"></li>
            <li v-if="currentUser.avatar" v-text="$t('profile.delete-avatar')" @click="deleteAvatar()"></li>
            <li v-text="$t('profile.logout')" @click="logout()"></li>
          </ul>
        </div>
        <div class="profile__row">
          <span class="typography--bold" v-text="currentUser.recipes || 0"></span>
          <span class="profile__label" v-text="$t('profile.recipes')"></span>
          <span class="typography--bold" v-text="currentUser.followers || 0"></span>
          <span class="profile__label" v-text="$t('profile.followers')"></span>
          <span class="typography--bold" v-text="currentUser.following || 0"></span>
          <span class="profile__label" v-text="$t('profile.following')"></span>
        </div>
        <div class="profile__row">
          <span class="profile__text"></span>
        </div>
      </div>
    </div>
    <div class="view__separator"></div>
    <div class="grid">
      <p class="typography--center" v-text="$t('grid.no-data')"></p>
    </div>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'
import { SET_AUTH } from '../../store/mutation-types'

export default {
  name: 'ProfileView',
  mixins: [ base ],
  data () {
    return {
      loading: false,
      currentUser: {}
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    window.addEventListener('click', this.closeDropdown)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.closeDropdown)
  },
  methods: {
    toggleDropdown () {
      this.$refs.dropdown.style.top = `${this.$refs.toggle.offsetTop + this.$refs.toggle.offsetHeight + 8}px`
      this.$refs.dropdown.style.left = `${this.$refs.toggle.offsetLeft}px`
      this.$refs.dropdown.classList.toggle('active')
    },
    closeDropdown () {
      this.$refs.dropdown.classList.remove('active')
    },
    fetchData () {
      this.loading = true
      this.$api.user.get(this.$store.state.auth.currentUserId).then(value => {
        this.currentUser = value.data
        this.loading = false
      })
    },
    logout () {
      this.$api.auth.logout().then(() => {
        this.showInfo('info.logout-successful')
        this.$store.commit(SET_AUTH, { loggedIn: false, currentUserId: null })
        this.$router.push('/login')
      })
    },
    uploadAvatar () {
      const file = this.$refs.avatar.files[0]
      if (file.size > 10485760) { // 10MB
        this.showError('error.file-exceeds-limit')
        this.$refs.avatar.value = ''
      } else {
        this.$api.upload.create(file).then(value => {
          this.currentUser.avatar = value.data
          return this.$api.user.update(this.currentUser.id, { avatar: value.data })
        }).then(() => {
          this.showInfo('info.avatar-update-successful')
        })
      }
    },
    deleteAvatar () {
      this.$api.upload.delete(this.currentUser.avatar).then(() => {
        this.currentUser.avatar = null
        return this.$api.user.update(this.currentUser.id, { avatar: '' })
      }).then(() => {
        this.showInfo('info.avatar-delete-successful')
      })
    },
    triggerAvatar () {
      this.$refs.avatar.click()
    }
  }
}
</script>
