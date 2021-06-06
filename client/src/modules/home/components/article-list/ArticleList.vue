<template>
  <div>
    <v-carousel
      class="article-list"
      cycle
      height="400"
      continuous
      hide-delimiter-background
      show-arrows-on-hover
      :interval="3000"
      light
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item v-for="(article, i) in articleListForCarousel" :key="i">
        <v-card @click="getArticleDetail(article._id)">
          <common-v-image :src="article.image || defaultImage" height="300" />
          <v-card-title class="pt-1">{{ article.title }}</v-card-title>
          <v-card-subtitle>
            <div class="d-flex justify-space-between">
              <div>By {{ article.author.name }}</div>
              <div class="caption">{{ getCreatedAt(article) }}</div>
            </div>
            <div class="description">{{ article.description }}</div>
          </v-card-subtitle>
        </v-card>
      </v-carousel-item>
    </v-carousel>

    <v-divider class="my-5"></v-divider>

    <SliderX v-if="articlesForSlide.length" :items="articlesForSlide">
      <template v-slot:item="{ item }">
        <v-card width="300px" height="320" @click="getArticleDetail(item._id)">
          <common-v-image :src="item.image || defaultImage" height="200" />
          <v-card-title class="pt-1">{{ item.title }}</v-card-title>
          <v-card-subtitle>
            <div class="d-flex justify-space-between">
              <div>By {{ item.author.name }}</div>
              <div class="caption">{{ getCreatedAt(item) }}</div>
            </div>
            <div class="description">{{ item.description }}</div>
          </v-card-subtitle>
        </v-card>
      </template>
    </SliderX>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { ArticleDetail } from "../../../articles/constants";
import SliderX from "../SliderX.vue";
import orderBy from "lodash/orderBy";
import moment from "moment";

@Component({
  components: {
    SliderX,
  },
})
export default class ArticleList extends Vue {
  @Prop({ default: null }) private value!: string;
  defaultImage = "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg";

  get articles(): ArticleDetail[] {
    const items = this.$store.state.home?.article?.items || [];
    return orderBy(items, ["createdAt"]);
  }

  get articlesForSlide() {
    return this.articles.splice(3, this.articles.length);
  }

  get articleListForCarousel(): ArticleDetail[] {
    const tmp = this.articles.slice(0, 3);
    return tmp;
  }

  getCreatedAt(article: ArticleDetail) {
    const { createdAt } = article;
    return moment(createdAt).isValid()
      ? moment(createdAt).format("DD/MM/YYYY")
      : "";
  }

  getArticleDetail(id: string) {
    this.$router.push("/articles/" + id);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .article-list {
  .v-window__next,
  .v-window__prev {
    .v-btn .v-icon {
      color: white !important;
    }
  }
  .v-carousel__controls {
    height: 29px;
  }
}

.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-bottom: 0;
  margin-bottom: 1rem;
}
</style>
