<template>
  <v-container class="home-page">
    <v-row>
      <v-col cols="12" sm="7" md="8">
        <ArticleList />
      </v-col>
      <v-col cols="12" sm="5" md="4">
        <ExamList />
      </v-col>
    </v-row>
    <v-divider class="mt-5 mb-3"></v-divider>
    <v-row class="pb-12">
      <v-col><VideoList /></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ArticleList from "../components/article-list/ArticleList.vue";
import ExamList from "../components/exam-list/ExamList.vue";
import VideoList from "../components/video-list/VideoList.vue";

@Component({
  components: {
    ArticleList,
    ExamList,
    VideoList,
  },
})
export default class HomePage extends Vue {
  async created() {
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("home/getHomeList", this.params);
    await this.$store.dispatch("setLoading", false);
  }

  get params() {
    return this.$store.state.home?.params || {};
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100vh;
}
</style>
