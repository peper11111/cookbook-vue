<template>
<div class="profile-view view" v-if="!loading">
  <div class="view__wrapper">
    <div class="profile">
      <div class="profile__image" @click="triggerAvatar()">
        <img :src="userDetails.avatarId ? url(userDetails.avatarId) : '/static/blank-profile.jpg'">
        <input type="file" accept="image/*" style="display: none" ref="avatar" @change="uploadAvatar()"/>
        <div class="profile__overlay">
          <i class="material-icons">camera_alt</i>
        </div>
      </div>
      <div class="profile__content">
        <div class="profile__row">
          <span class="typography__header" v-text="userDetails.name"></span>
          <div class="profile__button button button--border" v-text="$t('profile.edit')"></div>
          <div class="icon-button" ref="toggle" @click.stop="toggleDropdown()">
            <i class="material-icons" >more_vert</i>
          </div>
          <ul class="dropdown dropdown--list" ref="dropdown">
            <router-link tag="li" to="/new-recipe" v-text="$t('profile.add-recipe')"></router-link>
            <li v-if="userDetails.avatarId" v-text="$t('profile.delete-avatar')" @click="deleteAvatar()"></li>
            <li v-text="$t('profile.logout')" @click="logout()"></li>
          </ul>
        </div>
        <div class="profile__row">
          <span class="typography--bold" v-text="userDetails.recipes || 0"></span>
          <span class="profile__label" v-text="$t('profile.recipes')"></span>
          <span class="typography--bold" v-text="userDetails.followers || 0"></span>
          <span class="profile__label" v-text="$t('profile.followers')"></span>
          <span class="typography--bold" v-text="userDetails.following || 0"></span>
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
import base from '@/mixins/base'

export default {
  name: 'ProfileView',
  mixins: [ base ],
  data () {
    return {
      loading: false,
      userDetails: {}
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
  computed: {
    currentUserId () {
      return this.$store.state.currentUser.id
    }
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
      this.$http.get(`/users/${this.currentUserId}/details`).then(value => {
        this.userDetails = value.data
        this.loading = false
      })
    },
    logout () {
      this.$http.post('/auth/logout').then(() => {
        this.showInfo('info.logout-successful')
        this.$store.commit('logout')
        this.$router.push('/login')
      })
    },
    uploadAvatar () {
      const file = this.$refs.avatar.files[0]
      if (file && file.size > 10485760) { // 10MB
        this.showError('error.file-exceeds-limit')
        this.$refs.avatar.value = ''
      } else {
        let user
        const formData = new FormData()
        formData.set('file', file)

        this.$http.post('/uploads', formData).then(value => {
          user = { ...this.userDetails, avatarId: value.data }
          return this.$http.put(`/users/${this.currentUserId}/details`, user)
        }).then(() => {
          this.userDetails = user
          this.showInfo('info.avatar-update-successful')
        })
      }
    },
    deleteAvatar () {
      const user = { ...this.userDetails, avatarId: null }
      this.$http.put(`/users/${this.currentUserId}/details`, user).then(() => {
        return this.$http.delete(`/uploads/${this.userDetails.avatarId}`)
      }).then(() => {
        this.userDetails = user
        this.showInfo('info.avatar-delete-successful')
      })
    },
    triggerAvatar () {
      this.$refs.avatar.click()
    }
  }
}
</script>
