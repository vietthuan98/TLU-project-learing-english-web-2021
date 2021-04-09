<template>
  <v-card>
    <v-img :src="image" height="200px"></v-img>
    <v-card-title>
      {{ article.title }}
    </v-card-title>
    <v-card-subtitle>By {{ author }}</v-card-subtitle>
    <v-card-actions>
      <v-btn link text small @click="viewDetail">Read more...</v-btn>
      <common-heart class="ml-auto" :value="likes" />
      <common-comment :value="comments" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ArticleDetail } from "../constants";

@Component({})
export default class ArticleItem extends Vue {
  @Prop({ default: () => ({}) }) article!: ArticleDetail;
  defaultImage = "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg";

  viewDetail() {
    console.log("viewDetail");
  }

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
}
</script>

<style lang="scss" scoped></style>
