<template>
  <v-container class="article-list-page">
    <v-icon class="icon-delete" @click="deleteItem" color="black"
      >mdi-trash-can</v-icon
    >
    <common-v-bread-crumbs :items="breadCrumbs" />
    <ArticleDetailContent @update-article="updateArticle" />
    <ArticleDetailAction @update-article="updateArticle" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import ArticleDetailContent from "../components/article-detail/ArticleDetailContent.vue";
import ArticleDetailAction from "../components/article-detail/ArticleDetailAction.vue";
import { ArticleForm } from "../constants";
import {
  confirmDelete,
  successMessage,
  errorMessage,
} from "../../../helpers/functions";
import ArticleAPI from "../service";

@Component({
  components: {
    ArticleDetailContent,
    ArticleDetailAction,
  },
})
export default class ArticleDetailPage extends Vue {
  get breadCrumbs() {
    return [
      {
        text: "Article list",
        to: "/articles",
        disabled: false,
      },
      {
        text: "Article detail",
        to: "#",
        disabled: true,
      },
    ];
  }

  async created() {
    await this.$store.dispatch("setLoading", true);
    await this.getArticleDetail();
    await this.$store.dispatch("setLoading", false);
  }

  async getArticleDetail() {
    await this.$store.dispatch(
      "articles/getArticleDetail",
      this.$route.params.id as string
    );
  }

  get articleDetail() {
    return this.$store.state.articles.articleDetail;
  }

  async updateArticle(data: ArticleForm) {
    const id = this.articleDetail._id as string;
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("articles/updateArticleDetail", { id, data });
    await this.$store.dispatch("setLoading", false);
  }

  async deleteItem() {
    const confirm = await confirmDelete();
    if (!confirm) return;
    const id = this.articleDetail._id as string;
    await this.$store.dispatch("setLoading", true);
    const response = await ArticleAPI.delete(id);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      await successMessage(response.message);
      this.$router.push("/articles");
    } else {
      await errorMessage(response.message);
    }
  }
}
</script>

<style lang="scss" scoped>
.article-detail-page {
  height: 100vh;
  position: relative;
}

.icon-delete {
  position: absolute;
  right: 0;
  transform: translate(-100%, 50%);
}
</style>
