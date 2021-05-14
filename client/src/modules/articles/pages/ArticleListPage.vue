<template>
  <div id="article-page">
    <v-container v-if="articleList.length">
      <v-row>
        <template v-for="(article, index) in articleList">
          <v-col :key="index" class="col-md-3 col-sm-6 col-12">
            <ArticleItem :article="article" />
          </v-col>
        </template>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <div class="no-data">
          <p>
            Nothing here,
            <a href="#">let's creates a new one.</a>
          </p>
        </div>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination
        v-if="totalPage > 1"
        :value="page"
        @input="onChangePage"
        :length="totalPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ArticleItem from "../components/ArticleItem.vue";
import { ArticleDetail, ArticleParams } from "../constants";

@Component({
  components: {
    ArticleItem,
  },
})
export default class ArticleListPage extends Vue {
  @Prop({ default: null }) private value!: string;

  async created() {
    await this.$store.dispatch("setLoading", true);
    await this.getArticleList();
    await this.$store.dispatch("setLoading", false);
  }

  get params() {
    return (this.$store.state?.articles.params as ArticleParams) || {};
  }

  get page() {
    return this.params?.page as number;
  }

  get total() {
    return this.$store.state?.articles?.total as number;
  }

  get totalPage() {
    return Math.ceil(this.total / (this.params.limit as number));
  }

  get articleList() {
    return this.$store.state?.articles?.articleList as ArticleDetail[];
  }

  async getArticleList() {
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("articles/getArticleList", this.params);
    await this.$store.dispatch("setLoading", false);
  }

  async onChangePage(page: number) {
    this.$store.commit("articles/setParams", {
      ...this.params,
      page,
    });
    await this.getArticleList();
  }
}
</script>

<style lang="scss" scoped>
#article-page {
  width: 100vw;

  .no-data {
    height: 70vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 1.5rem;
  }
}
</style>
