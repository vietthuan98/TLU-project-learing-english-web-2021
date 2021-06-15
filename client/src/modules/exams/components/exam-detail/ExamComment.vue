<template>
  <v-card
    @mouseenter="isShowIcon = true"
    @mouseleave="isShowIcon = false"
    class="mb-4 comment"
    :class="{ owner: owner }"
  >
    <v-card-subtitle>
      {{ userName }}
      <v-icon
        v-if="owner"
        v-show="isShowIcon"
        class="icon-delete"
        size="20"
        @click="deleteComment"
      >
        mdi-close-circle
      </v-icon>
    </v-card-subtitle>
    <v-card-text>{{ message }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import TokenService from "../../../../helpers/token";

interface Comment {
  _id: string;
  message: string;
  user: {
    _id: string;
    name: string;
  };
}

@Component({})
export default class ExamComment extends Vue {
  @Prop({ default: () => ({}) }) private comment!: Comment;
  isShowIcon = false;

  get message() {
    return this.comment.message || "";
  }

  get userName() {
    return this.comment?.user?.name || "";
  }

  get owner() {
    return TokenService.getUser()._id === this.comment?.user?._id;
  }

  deleteComment() {
    this.$emit("delete-comment", { deletedCommentId: this.comment._id });
  }
}
</script>

<style lang="scss" scoped>
.comment {
  .v-card__subtitle {
    font-weight: 500;
    position: relative;
    .icon-delete {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
}

.owner .v-card__subtitle {
  font-weight: 900;
}
</style>
