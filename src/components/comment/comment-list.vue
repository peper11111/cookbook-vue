<template>
<div class="c-comment-list">
  <div
    v-if="!autoInit && commentsCount !== 0"
    @click="toggleComments"
    class="c-comment-list__responses"
  >
    <span>
      {{ commentsVisible ? $t('comment.hide-responses') : $t('comment.show-responses', [ commentsCount ]) }}
    </span>
    <i class="material-icons">
      {{ commentsVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
    </i>
  </div>
  <div
    v-if="commentsVisible"
    class="c-comment-list__wrapper"
  >
    <comment-item
      v-for="comment in items"
      :key="comment.id"
      :comment="comment"
      :recipeId="recipeId"
      @refresh="init"
    ></comment-item>
  </div>
</div>
</template>

<script>
import scroll from '@/mixins/scroll'

export default {
  name: 'CommentList',
  components: {
    CommentItem: () => import('@/components/comment/comment-item')
  },
  mixins: [ scroll ],
  props: {
    commentsCount: Number,
    parentId: Number,
    recipeId: Number,
    type: String
  },
  data () {
    return {
      commentsVisible: this.autoInit
    }
  },
  mounted () {
    this.$parent.$on('refresh', this.init)
  },
  beforeDestroy () {
    this.$parent.$off('refresh', this.init)
  },
  methods: {
    toggleComments () {
      if (this.commentsVisible) {
        this.commentsVisible = false
        this.done = true
        return
      }
      this.commentsVisible = true
      this.init()
    },
    getFetchMethod () {
      switch (this.type) {
        case 'recipe-comments':
          return this.$api.recipes.readComments(this.recipeId, { page: this.page })
        case 'comment-item':
          return this.$api.comments.readComments(this.parentId, { page: this.page })
        default:
          return Promise.resolve({ data: [] })
      }
    }
  }
}
</script>

<style lang="scss">
.c-comment-list {
  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__responses {
    font-weight: bold;
    margin-bottom: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}
</style>
