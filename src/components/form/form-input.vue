<template>
<div v-if="disabled">
  {{ value }}
</div>
<input
  v-else
  :maxlength="maxlength"
  :placeholder="placeholder"
  :value="value"
  @input="onInput"
  class="o-form__input"
>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    disabled: Boolean,
    placeholder: String,
    value: [ String, Number ],
    maxlength: {
      default: 255,
      type: Number
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
