<template>
<div class="profile-view view">
  <div class="o-page__wrapper">
    <user-profile :id="currentUserId">
    </user-profile>
    <div class="profile">
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
  name: 'ProfilePage',
  components: {
    UserProfile: () => import('@/components/user-profile')
  },
  mixins: [ base ],
  data () {
    return {
      loading: false,
      userDetails: {}
    }
  },
  computed: {
    currentUserId () {
      return this.$store.state.currentUser.id
    }
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
    logout () {
      this.$http.post('/auth/logout').then(() => {
        this.showInfo('info.logout-successful')
        this.$store.commit('logout')
        this.$router.push('/login')
      })
    },
    deleteAvatar () {
      const user = { ...this.userDetails, avatarId: null }
      this.$http.put(`/users/${this.currentUserId}/details`, user).then(() => {
        return this.$http.delete(`/uploads/${this.userDetails.avatarId}`)
      }).then(() => {
        this.userDetails = user
        this.showInfo('info.avatar-delete-successful')
      })
    }
  }
}
</script>
