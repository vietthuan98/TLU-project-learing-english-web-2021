<template>
  <v-card v-if="videoList.length" class="video-recommendation mt-10">
    <v-toolbar class="video-recommendation__title" color="primary" dark>
      <v-toolbar-title>More videos</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item-group>
        <template v-for="(item, index) in videoList">
          <v-list-item
            active-class="primary--text"
            :key="index"
            @click="getVideoDetail(item._id)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-text="item.author.name"
              ></v-list-item-subtitle>
              <v-list-item-subtitle
                class="text-end"
                v-text="getDuration(item)"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="index < videoList.length - 1"
            :key="index + 'divider'"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { VideoDetail } from "../constants";
import moment from "moment";

@Component({})
export default class VideoRecommendation extends Vue {
  @Prop({ default: null }) private value!: string;

  async created() {
    await this.getVideoList();
  }

  get params() {
    return this.$store.state?.videos.params || {};
  }

  async getVideoList() {
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("videos/getVideoList", {
      page: 1,
      limit: 20
    }); //TODO: filter by author, genre
    await this.$store.dispatch("setLoading", false);
  }

  get videoDetail(): VideoDetail {
    return this.$store.state.videos?.videoDetail || {};
  }

  get videoList() {
    const videos =
      (this.$store.state?.videos?.videoList as VideoDetail[]) || [];
    return videos.filter(video => video._id !== this.videoDetail._id);
  }

  getVideoDetail(id: string) {
    this.$emit("on-get-video-detail", id);
  }

  getDuration(item: VideoDetail) {
    if (item.duration)
      return moment(item.duration).isValid()
        ? moment.utc(item.duration * 1000).format("mm:ss")
        : "";
    return "";
  }
}
</script>

<style lang="scss" scoped>
.video-recommendation {
  overflow: auto;
  position: relative;

  &__title {
    position: sticky;
    top: 0;
    z-index: 99;
  }
}

.v-list-item__title,
.v-list-item__subtitle {
  overflow: visible;
  white-space: normal;
}
</style>
