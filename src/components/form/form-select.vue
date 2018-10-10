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
    v-for="option in options"
    :key="option.value"
    :value="option.value"
    :selected="option.value === value"
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
    value: Number
  },
  computed: {
    label () {
      return this.options.find((option) => {
        return option.value === this.value
      }).label
    }
  },
  methods: {
    onChange (event) {
      this.$emit('input', Number(event.target.value))
    }
  }
}
</script>

<style lang="scss">

</style>
