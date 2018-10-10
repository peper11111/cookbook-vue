<template>
<div v-if="disabled">
  {{ value }}
</div>
<textarea
  v-else
  :placeholder="placeholder"
  :value="value"
  :rows="rows"
  :maxlength="maxlength"
  @input="onInput"
  class="o-form__textarea"
></textarea>
</template>

<script>
export default {
  name: 'FormTextarea',
  props: {
    disabled: Boolean,
    placeholder: String,
    value: String,
    rows: {
      default: 3,
      type: Number
    },
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
