<template>
  <ArticleDetailLayout>
    <template v-slot:title>{{ title }}</template>
    <template v-slot:description>{{ description }}</template>
    <template v-slot:image>
      <v-img
        v-if="image || defaultImage"
        :src="image || defaultImage"
        aspect-ratio
        max-height="300"
        class="mb-4"
      >
      </v-img>
    </template>
    <template v-for="(text, index) in paragraph">
      <div class="paragraph" :key="index">{{ text }}</div>
    </template>
    <template v-slot:like>
      <common-heart :value="totalLikes" class="ml-auto" @click.native="like" />
    </template>
  </ArticleDetailLayout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ArticleDetail } from "../../constants";
import ArticleDetailLayout from "./ArticleDetailLayout.vue";
import TokenService from "../../../../helpers/token";

@Component({
  components: {
    ArticleDetailLayout,
  },
})
export default class ArticleDetailContent extends Vue {
  @Prop({ default: null }) private value!: string;
  defaultImage = "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg";

  get articleDetail(): ArticleDetail {
    return this.$store.state?.articles?.articleDetail || {};
  }

  get title() {
    return this.articleDetail?.title || "";
  }

  get description() {
    return this.articleDetail?.description || "";
  }

  get image() {
    return this.articleDetail?.image || "";
  }

  get paragraph() {
    return this.articleDetail?.paragraph || "";
  }

  get likes() {
    return this.articleDetail?.likes || [];
  }

  get totalLikes() {
    return (this.likes || []).length;
  }

  get isLiked() {
    return this.likes.some((like) => like._id === TokenService.getUser()._id);
  }

  like() {
    this.$emit("update-article", { like: !this.isLiked });
  }
}
</script>

<style lang="scss" scoped>
.paragraph {
  text-indent: 3%;
  text-align: justify;
}
</style>
