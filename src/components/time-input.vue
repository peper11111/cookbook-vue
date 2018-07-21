<template>
<div class="c-time-input">
  <label v-if="!disabled">
    <input
      v-model="model.hours"
      @input="emitValue"
      class="c-time-input__value o-form__input"
    />
    <span class="c-time-input__label">
      h
    </span>
  </label>
  <label v-if="!disabled">
    <input
      v-model="model.minutes"
      @input="emitValue"
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
    disabled: Boolean,
    value: Number
  },
  data () {
    return {
      model: {
        hours: Math.trunc(this.value / 60) || '',
        minutes: Math.trunc(this.value % 60) || ''
      }
    }
  },
  computed: {
    text () {
      let text = ''
      if (this.model.hours) {
        text += `${this.model.hours} h`
      }
      if (text) {
        text += ' '
      }
      if (this.model.minutes) {
        text += `${this.model.minutes} min`
      }
      return text
    }
  },
  watch: {
    value: 'setValue'
  },
  methods: {
    emitValue () {
      if (/^[0-9]{0,2}$/.test(this.model.hours) &&
        /^[0-5]?[0-9]?$/.test(this.model.minutes)) {
        const val = Number(this.model.hours) * 60 + Number(this.model.minutes)
        this.$emit('input', val)
      } else {
        this.setValue(this.value)
      }
    },
    setValue (val) {
      this.model.hours = Math.trunc(val / 60) || ''
      this.model.minutes = Math.trunc(val % 60) || ''
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
    width: 18px;
    text-align: center;
  }
}
</style>
