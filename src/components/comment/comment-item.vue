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
    <div
      v-if="!previewMode"
      class="c-comment-item__row c-comment-item__row--right"
    >
      <button
        @click="onAction('clear')"
        class="o-button o-button__primary"
      >
        {{ $t('global.cancel') }}
      </button>
      <button
        @click="onAction('save')"
        class="o-button o-button__accent"
      >
        {{ $t('global.save') }}
      </button>
    </div>
    <div
      v-else
      class="c-comment-item__row"
    >
      <span
        v-if="isAuthor"
        @click="onAction('edit')"
        class="c-comment-item__action"
      >
        {{ $t('global.edit') }}
      </span>
      <span
        v-if="isAuthor"
        @click="onAction('delete')"
        class="c-comment-item__action"
      >
        {{ $t('global.delete') }}
      </span>
      <span
        @click="responseVisible = true"
        class="c-comment-item__action"
      >
        {{ $t('global.reply') }}
      </span>
    </div>
    <comment-input
      v-if="responseVisible"
      :parentId="comment.id"
      :recipeId="recipeId"
      @refresh="$emit('refresh')"
      @cancel="responseVisible = false"
    ></comment-input>
    <div
      v-if="comment.commentsCount !== 0"
      @click="commentsVisible = !commentsVisible"
      class="c-comment-item__responses"
    >
      <span>
        {{ commentsVisible ? $t('comment.hide-responses') : $t('comment.show-responses', [ comment.commentsCount ]) }}
      </span>
      <i class="material-icons">
        {{ commentsVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
      </i>
    </div>
    <comment-list
      v-if="commentsVisible"
      :parentId="comment.id"
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
      responseVisible: false,
      commentsVisible: false,
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
    object-fit: cover;
    border-radius: 50%;
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

  &__action {
    color: $color-text-secondary;
    cursor: pointer;
    margin-right: 8px;

    &:hover {
      text-decoration: underline;
    }
  }

  &__responses {
    font-weight: bold;
    margin-bottom: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}
</style>
