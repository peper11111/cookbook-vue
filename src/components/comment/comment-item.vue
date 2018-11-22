<template>
<div class="c-comment-item">
  <img
    :src="avatarSrc"
    class="c-comment-item__image"
  />
  <div class="c-comment-item__wrapper">
    <div class="c-comment-item__row">
      <router-link
        :to="`/user/${comment.author.id}`"
        class="c-comment-item__author"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="c-comment-item__time">
        {{ creationTime }}
      </span>
    </div>
    <form-input
      v-model="models.content"
      :disabled="previewMode"
      class="c-comment-item__content"
    ></form-input>
    <comment-actions
      :disabled="pending"
      :canEdit="isAuthor"
      :canDelete="isAuthor"
      :editMode="editMode"
      :previewMode="previewMode"
      @action="onAction"
      @reply="inputVisible = true"
    ></comment-actions>
    <comment-list
      :autoInit="false"
      :inputVisible="inputVisible"
      :showToggle="comment.commentsCount !== 0"
      :parentId="comment.id"
      :commentsCount="comment.commentsCount"
      :recipeId="recipeId"
      @cancel="inputVisible = false"
      type="comment-item"
    ></comment-list>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import config from '@/config'
import editor from '@/mixins/editor'

export default {
  name: 'CommentItem',
  components: {
    CommentActions: () => import('@/components/comment/comment-actions'),
    CommentList: () => import('@/components/comment/comment-list'),
    CommentInput: () => import('@/components/form/comment-input'),
    FormInput: () => import('@/components/form/form-input')
  },
  mixins: [ editor ],
  props: {
    comment: Object,
    recipeId: Number
  },
  data () {
    return {
      inputVisible: false,
      models: {
        content: null
      }
    }
  },
  computed: {
    model () {
      return this.comment
    },
    authUser () {
      return this.$store.state.auth.user
    },
    avatarSrc () {
      return this.$helpers.thumbnailSrc(this.comment.author.avatarId) || config.blankAvatar
    },
    creationTime () {
      return moment(this.comment.creationTime).fromNow()
    },
    isAuthor () {
      return this.comment.author.id === this.authUser.id
    }
  },
  methods: {
    modify (params) {
      return this.$api.comments.modify(this.comment.id, params).then(() => {
        this.$notify.success('comment-update-successful')
        this.$emit('refresh')
      })
    },
    delete () {
      if (!confirm(this.$t('comment.comment-delete'))) {
        return Promise.resolve()
      }
      return this.$api.comments.delete(this.comment.id).then(() => {
        this.$notify.success('comment-delete-successful')
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/variables";

.c-comment-item {
  display: flex;

  &__image {
    width: 50px;
    height: 50px;
    margin-top: 8px;
    object-fit: cover;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__wrapper {
    flex-grow: 1;
    margin-left: 16px;
  }

  &__row {
    display: flex;
    align-items: center;
    margin: 8px 0;

    &--right {
      justify-content: flex-end;
    }
  }

  &__author {
    text-decoration: none;
    color: $color-text-primary;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  &__time {
    margin-left: 8px;
  }

  &__content {
    width: 100%;
  }
}
</style>
