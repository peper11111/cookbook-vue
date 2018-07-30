<template>
<div>
  <textarea
    v-if="!disabled"
    :placeholder="placeholder"
    :value="localValue"
    :rows="rows"
    :maxlength="maxlength"
    @input="setLocalValue($event.target.value)"
    class="o-form__textarea"
  ></textarea>
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
    value: String,
    rows: Number,
    maxlength: Number
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
