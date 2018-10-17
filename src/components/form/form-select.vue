<template>
<div v-if="disabled">
  {{ label }}
</div>
<select
  v-else
  @change="onChange"
  class="o-form__select"
>
  <option
    value=""
  ></option>
  <option
    v-for="option in options"
    :key="option.value"
    :value="option.value"
    :selected="isSelected(option)"
  >
    {{ option.label }}
  </option>
</select>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    disabled: Boolean,
    options: Array,
    value: [ String, Number ]
  },
  computed: {
    label () {
      return this.options.find((option) => {
        return this.isSelected(option)
      }).label
    }
  },
  methods: {
    onChange (event) {
      this.$emit('input', event.target.value || null)
    },
    isSelected (option) {
      return String(option.value) === String(this.value)
    }
  }
}
</script>

<style lang="scss">

</style>
