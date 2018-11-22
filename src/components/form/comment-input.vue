<template>
<div class="c-comment-input">
  <img
    :src="avatarSrc"
    class="c-comment-input__image"
  />
  <div class="c-comment-input__wrapper">
    <input
      v-model="comment"
      :placeholder="$t('comment.placeholder')"
      class="o-form__input o-form__input--full"
    />
    <div class="c-comment-input__buttons">
      <button
        :class="{ 'is-disabled': pending }"
        @click="cancel"
        class="o-button o-button__primary"
      >
        {{ $t('global.cancel') }}
      </button>
      <button
        :class="{ 'is-disabled': pending }"
        @click="createComment"
        class="o-button o-button__accent"
      >
        {{ $t('global.comment') }}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import config from '@/config'
import requester from '@/mixins/requester'

export default {
  name: 'CommentInput',
  mixins: [ requester ],
  props: {
    recipeId: Number,
    parentId: Number
  },
  data () {
    return {
      comment: ''
    }
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    },
    avatarSrc () {
      return this.$helpers.thumbnailSrc(this.authUser.avatarId) || config.blankAvatar
    }
  },
  methods: {
    createComment () {
      this.wrap(() => {
        return this.$api.comments.create({
          content: this.comment,
          recipeId: this.recipeId,
          parentId: this.parentId
        }).then(() => {
          this.comment = ''
          this.$notify.success('comment-create-successful')
          this.$emit('refresh')
        })
      })
    },
    cancel () {
      this.comment = ''
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss">
.c-comment-input {
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

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
