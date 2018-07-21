<template>
<div class="c-time-input">
  <label v-if="!disabled">
    <input
      :value="hours"
      @input="setHours($event)"
      class="c-time-input__value o-form__input"
    />
    <span class="c-time-input__label">
      h
    </span>
  </label>
  <label v-if="!disabled">
    <input
      :value="minutes"
      @input="setMinutes($event)"
      class="c-time-input__value o-form__input"
    />
    <span class="c-time-input__label">
      min
    </span>
  </label>
  <p v-if="disabled">
    {{ text }}
  </p>
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
      if (text) {
        text += ' '
      }
      if (this.minutes) {
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
    width: 30px;
    text-align: center;
  }
}
</style>
