<template>
  <v-card class="mt-4">
    <v-card-title>Comments</v-card-title>
    <v-card-text>
      <template v-if="comments.length">
        <template v-for="item in comments">
          <ArticleComment
            :key="item._id"
            :comment="item"
            @delete-comment="updateArticle"
          />
        </template>
      </template>

      <v-textarea
        solo
        name="input-7-4"
        label="Leave your comment"
        v-model="comment"
        @keyup.enter="addComment"
      ></v-textarea>
      <v-btn class="primary" @click="addComment">
        Submit
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ArticleComment from "./ArticleComment.vue";
import { ArticleDetail, ArticleForm } from "../../constants";
import articleService from "../../service";

@Component({
  components: {
    ArticleComment
  }
})
export default class ArticleDetailAction extends Vue {
  @Prop({ default: null }) private value!: string;
  comment = "";

  get articleDetail(): ArticleDetail {
    return this.$store.state?.articles?.articleDetail || {};
  }

  get comments() {
    return this.articleDetail.comments || [];
  }

  addComment() {
    this.updateArticle({
      comment: this.comment
    });
    this.comment = "";
  }

  updateArticle(data: ArticleForm) {
    this.$emit("update-article", data);
  }
}
</script>

<style lang="scss" scoped></style>
