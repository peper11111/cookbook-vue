<template>
<div class="c-recipe-comments">
  <h1 class="c-recipe-comments__title">
    {{ $t('recipe.comments') }}
  </h1>
  <comment-list
    v-if="comments.length !== 0"
    :comments="comments"
  ></comment-list>
  <p
    v-else
    class="c-recipe-comments__text"
  >
    {{ $t('comment.no-comments') }}
  </p>
</div>
</template>

<script>
import requester from '@/mixins/requester'

export default {
  name: 'RecipeComments',
  components: {
    CommentList: () => import('@/components/list/comment-list')
  },
  mixins: [ requester ],
  data () {
    return {
      comments: null
    }
  },
  computed: {
    recipe () {
      return this.$store.state.recipe
    }
  },
  created () {
    this.wrap(this.fetchComments)
  },
  methods: {
    fetchComments () {
      return this.$api.recipes.readComments(this.recipe.id).then((value) => {
        this.comments = value.data
      })
    }
  }
}
</script>

<style lang="scss">
.c-recipe-comments {
  padding: 0 32px;

  &__title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  &__text {
    text-align: center;
  }
}
</style>
