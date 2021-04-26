<template>
  <v-container>
    <ArticleDetailBreadCrumbs />
    <ArticleDetailContent @update-article="updateArticle" />
    <ArticleDetailAction @update-article="updateArticle" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import ArticleDetailContent from "../components/article-detail/ArticleDetailContent.vue";
import ArticleDetailAction from "../components/article-detail/ArticleDetailAction.vue";
import ArticleDetailBreadCrumbs from "../components/article-detail/ArticleDetailBreadCumbs.vue";
import { ArticleForm } from "../constants";

@Component({
  components: {
    ArticleDetailContent,
    ArticleDetailAction,
    ArticleDetailBreadCrumbs,
  },
})
export default class ArticleDetailPage extends Vue {
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

  async updateArticle(data: ArticleForm) {
    const id = this.$store.state.articles.articleDetail._id as string;
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("articles/updateArticleDetail", { id, data });
    await this.$store.dispatch("setLoading", false);
  }
}
</script>

<style lang="scss" scoped>
.article-detail-page {
  height: 100vh;
}
</style>
