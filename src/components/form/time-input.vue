<template>
<div v-if="disabled">
  {{ text }}
</div>
<div
  v-else
  class="c-time-input"
>
  <input
    :value="hours"
    @input="setHours"
    class="c-time-input__value o-form__input"
  />
  <span class="c-time-input__label">
    h
  </span>
  <input
    :value="minutes"
    @input="setMinutes"
    class="c-time-input__value o-form__input"
  />
  <span class="c-time-input__label">
    min
  </span>
</div>
</template>

<script>
export default {
  name: 'TimeInput',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: Number
  },
  data () {
    return {
      hours: Math.trunc(this.value / 60) || null,
      minutes: Math.trunc(this.value % 60) || null
    }
  },
  computed: {
    text () {
      let text = ''
      if (this.hours) {
        text += `${this.hours} h`
      }
      if (this.minutes) {
        if (this.hours) {
          text += ' '
        }
        text += `${this.minutes} min`
      }
      return text
    }
  },
  watch: {
    value (val) {
      this.hours = Math.trunc(val / 60) || null
      this.minutes = Math.trunc(val % 60) || null
    }
  },
  methods: {
    emitValue () {
      const val = Number(this.hours) * 60 + Number(this.minutes)
      this.$emit('input', val)
    },
    setHours (event) {
      if (this.disabled) {
        return
      }
      const value = event.target.value ? Number(event.target.value) : null
      if (value >= 0 && value <= 23) {
        this.hours = value
        this.emitValue()
      } else {
        event.target.value = this.hours
      }
    },
    setMinutes (event) {
      if (this.disabled) {
        return
      }
      const value = event.target.value ? Number(event.target.value) : null
      if (value >= 0 && value <= 59) {
        this.minutes = value
        this.emitValue()
      } else {
        event.target.value = this.minutes
      }
    }
  }
}
</script>

<style lang="scss">
.c-time-input {
  display: flex;
  align-items: center;

  &__label {
    padding: 0 2px;
  }

  &__value {
    width: 42px;
    text-align: center;
  }
}
</style>
