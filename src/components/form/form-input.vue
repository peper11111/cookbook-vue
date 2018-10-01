<template>
<div>
  <input
    v-if="!disabled"
    :placeholder="placeholder"
    :value="localValue"
    @input="setLocalValue($event.target.value)"
    class="o-form__input"
  >
  <p v-if="disabled">
    {{ localValue }}
  </p>
</div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    disabled: Boolean,
    placeholder: String,
    value: String
  },
  data () {
    return {
      localValue: this.value
    }
  },
  watch: {
    value (val) {
      this.localValue = val
    }
  },
  methods: {
    setLocalValue (val) {
      this.localValue = val
      this.$emit('input', this.localValue)
    }
  }
}
</script>
