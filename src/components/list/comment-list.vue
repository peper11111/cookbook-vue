<template>
<div class="c-comment-list">
  <comment-item
    v-for="comment in comments"
    :key="comment.id"
    :comment="comment"
  ></comment-item>
</div>
</template>

<script>
export default {
  name: 'CommentList',
  components: {
    CommentItem: () => import('@/components/list/comment-item')
  },
  props: {
    comments: Array
  }
}
</script>

<style lang="scss">
.c-comment-list {
}
</style>
