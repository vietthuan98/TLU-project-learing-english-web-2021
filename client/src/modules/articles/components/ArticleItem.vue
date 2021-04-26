<template>
  <v-card @mouseover="showEditIcon = true" @mouseleave="showEditIcon = false">
    <v-img :src="image" height="200px"></v-img>
    <v-card-title>
      {{ article.title }}
    </v-card-title>
    <v-card-subtitle class="description" v-if="article.description">
      {{ article.description }}
    </v-card-subtitle>
    <v-card-subtitle>By {{ author }}</v-card-subtitle>
    <v-card-actions>
      <v-btn link text small @click="viewDetail">Read more...</v-btn>
      <v-icon
        v-if="article.yours"
        class="edit-icon"
        size="20"
        v-show="showEditIcon"
        @click="editArticle"
        >mdi-pencil-outline
      </v-icon>
      <common-heart class="ml-auto" :value="likes" />
      <common-comment :value="comments" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ArticleDetail } from "../constants";
import bus from "../../../helpers/bus";
import { BUS_EVENTS } from "../../../helpers/constants";

@Component({})
export default class ArticleItem extends Vue {
  @Prop({ default: () => ({}) }) article!: ArticleDetail;
  showEditIcon = true;
  defaultImage = "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg";

  get author() {
    return this.article?.author?.name;
  }

  get image() {
    return this.article?.image || this.defaultImage;
  }

  get likes() {
    return this.article?.likes?.length;
  }

  get comments() {
    return this.article?.comments?.length;
  }

  editArticle() {
    bus.$emit(BUS_EVENTS.OPEN_ARTICLE_FORM_POPUP, this.article._id);
  }

  viewDetail() {
    this.$router.push(`/articles/${this.article._id}`);
  }
}
</script>

<style lang="scss" scoped>
.v-card__title {
  word-break: inherit;
}
.v-card__subtitle.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-bottom: 0;
  margin-bottom: 1rem;
}
</style>
