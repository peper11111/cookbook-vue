<template>
<form
  @submit.prevent="submit"
  class="c-app-search o-form"
>
  <div class="o-form__wrapper">
    <input
      v-model="search"
      :placeholder="$t('form.search')"
      class="o-form__input"
    />
    <div
      @click="submit"
      class="o-form__icon"
    >
      <i class="material-icons">
        search
      </i>
    </div>
  </div>
</form>
</template>

<script>
export default {
  name: 'AppSearch',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    submit () {
      console.log(this.search)
    }
  }
}
</script>

<style lang="scss">
.c-app-search {
  width: 300px;
}
</style>
