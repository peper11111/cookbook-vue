<template>
<div v-if="disabled">
  {{ value }}
</div>
<input
  v-else
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
    value: [ String, Number ]
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
