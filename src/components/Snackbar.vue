<template>
<div class="snackbar" v-text="text" :class="[ type, visible ? 'active' : '' ]"></div>
</template>

<script>
export default {
  name: 'Snackbar',
  data () {
    return {
      index: 0,
      message: undefined,
      displayTime: 3000,
      pending: false,
      visible: false
    }
  },
  created () {
    this.$store.watch((state) => {
      return state.messages
    }, () => {
      if (!this.pending) {
        this.pending = true
        this.showMessage()
      }
    })
  },
  computed: {
    text () {
      return this.message !== undefined ? this.$t(this.message.text) : ''
    },
    type () {
      return this.message !== undefined ? this.message.type : ''
    }
  },
  methods: {
    showMessage () {
      // TODO Add mechanism to clear shown messages.
      this.message = Object.assign({}, this.$store.state.messages[this.index++])
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 300 + this.displayTime)
      setTimeout(() => {
        if (this.$store.state.messages.length > this.index) {
          this.showMessage()
        } else {
          this.pending = false
        }
      }, 300 + this.displayTime + 300)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.snackbar {
  position: fixed;
  left: 24px;
  bottom: 24px;
  padding: 16px 24px;
  box-sizing: border-box;
  background-color: $color-grey-900;
  border-radius: 2px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  transform: translateY(200%);
  transition: transform 0.3s, opacity 0.3s;
  max-width: 568px;
  opacity: 0;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  &.info {
    color: $color-white;
  }

  &.error {
    color: $color-red-500;
  }
}
</style>
