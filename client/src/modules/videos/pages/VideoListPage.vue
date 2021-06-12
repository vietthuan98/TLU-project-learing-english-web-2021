<template>
  <div id="video-list-page">
    <v-container>
      <v-row>
        <v-col>
          <CommonTextSearch
            style="width: 80%"
            placeholder="Please enter your title you are looking for"
            v-model="params.title"
            @search="searchByTitle"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="videoList.length">
      <v-row>
        <template v-for="video in videoList">
          <v-col :key="video._id" class="col-md-4 col-sm-6 col-12">
            <VideoListItem :video="video" />
          </v-col>
        </template>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <div class="no-data">
          <p>
            Nothing here,
            <a href="/videos/upload">let's creates a new one.</a>
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
import VideoListItem from "../components/video-list/VideoListItem.vue";
import { VideoDetail, VideoParams } from "../constants";

@Component({
  components: {
    VideoListItem,
  },
})
export default class VideoListPage extends Vue {
  @Prop({ default: null }) private value!: string;

  async created() {
    await this.getVideoList();
  }

  get params() {
    return (this.$store.state?.videos.params || {}) as VideoParams;
  }

  get page() {
    return this.params?.page as number;
  }

  get total() {
    return this.$store.state?.videos?.total as number;
  }

  get totalPage() {
    return Math.ceil(this.total / (this.params.limit as number));
  }

  get videoList() {
    return this.$store.state?.videos?.videoList as VideoDetail[];
  }

  async getVideoList() {
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("videos/getVideoList", this.params);
    await this.$store.dispatch("setLoading", false);
  }

  async onChangePage(page: number) {
    this.$store.commit("videos/setParams", {
      ...this.params,
      page,
    });
    await this.getVideoList();
  }

  async searchByTitle(title: string) {
    this.$store.commit("videos/setParams", {
      ...this.params,
      page: 1,
      title,
    });
    await this.getVideoList();
  }
}
</script>

<style lang="scss" scoped>
#video-list-page {
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
