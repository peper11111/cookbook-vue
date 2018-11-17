<template>
<div class="c-comment-list">
  <comment-input
    v-if="inputVisible"
    :parentId="parentId"
    :recipeId="recipeId"
    @refresh="refreshComments"
    @cancel="$emit('cancel')"
  ></comment-input>
  <div
    v-if="toggleVisible"
    @click="loadComments"
    class="c-comment-list__responses"
  >
    <span>
      {{ $t('comment.load-responses', [ commentsCount ]) }}
    </span>
  </div>
  <div class="c-comment-list__wrapper">
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
    CommentItem: () => import('@/components/comment/comment-item'),
    CommentInput: () => import('@/components/form/comment-input')
  },
  mixins: [ scroll ],
  props: {
    showToggle: Boolean,
    inputVisible: Boolean,
    parentId: Number,
    commentsCount: Number,
    recipeId: Number,
    type: String
  },
  data () {
    return {
      toggleVisible: this.showToggle
    }
  },
  methods: {
    refreshComments () {
      this.$emit('cancel')
      this.init()
    },
    loadComments () {
      this.toggleVisible = false
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
    padding: 8px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}
</style>
