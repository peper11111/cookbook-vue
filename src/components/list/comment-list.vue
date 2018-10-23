<template>
<div class="c-comment-list">
  <comment-item
    v-for="comment in items"
    :key="comment.id"
    :comment="comment"
    :recipeId="recipeId"
    @refresh="init"
  ></comment-item>
</div>
</template>

<script>
import scroll from '@/mixins/scroll'

export default {
  name: 'CommentList',
  components: {
    CommentItem: () => import('@/components/list/comment-item')
  },
  mixins: [ scroll ],
  props: {
    commentId: Number,
    recipeId: Number,
    type: String
  },
  mounted () {
    this.$parent.$on('refresh', this.init)
  },
  beforeDestroy () {
    this.$parent.$off('refresh', this.init)
  },
  methods: {
    getFetchMethod () {
      switch (this.type) {
        case 'recipe-comments':
          return this.$api.recipes.readComments(this.recipeId, { page: this.page++ })
        case 'comment-item':
          return this.$api.comments.readComments(this.commentId, { page: this.page++ })
        default:
          return Promise.resolve({ data: [] })
      }
    }
  }
}
</script>

<style lang="scss">
.c-comment-list {
  display: flex;
  flex-direction: column;
}
</style>
