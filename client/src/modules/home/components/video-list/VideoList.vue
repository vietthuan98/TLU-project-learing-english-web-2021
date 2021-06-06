<template>
  <SliderX v-if="videoList.length" :items="videoList">
    <template v-slot:item="{ item }">
      <v-card
        width="300px"
        height="320"
        @click="getVideoDetail(item._id)"
        @mouseenter="isShowPauseIcon = true"
        @mouseleave="isShowPauseIcon = false"
      >
        <v-card-text class="pa-0">
          <div class="video-wrapper">
            <div class="overlay d-flex justify-center align-center">
              <v-icon v-show="isShowPauseIcon" size="150" color="black">
                mdi-motion-play-outline
              </v-icon>
            </div>
            <video class="video-item" width="100%" height="100%">
              <source :src="item.src" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </v-card-text>
        <v-card-title class="pt-0">
          {{ item.title }}
        </v-card-title>
        <v-card-subtitle>
          <div>By {{ item.author.name }}</div>
          <div class="d-flex justify-space-between">
            <div>{{ createdAt(item) }}</div>
            <div>Time: {{ getDuration(item) }}</div>
          </div>
        </v-card-subtitle>
      </v-card>
    </template>
  </SliderX>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SliderX from "../SliderX.vue";
import { VideoDetail } from "../../../videos/constants";
import orderBy from "lodash/orderBy";
import moment from "moment";

@Component({
  components: {
    SliderX,
  },
})
export default class VideoList extends Vue {
  @Prop({ default: null }) private value!: string;
  isShowPauseIcon = false;

  get videoList(): VideoDetail[] {
    const videos = this.$store.state.home?.video?.items || [];
    return orderBy(videos, ["createdAt"]);
  }

  getVideoDetail(id: string) {
    this.$router.push("/videos/" + id);
  }

  getDuration(video: VideoDetail) {
    if (video.duration)
      return moment(video.duration).isValid()
        ? moment.utc(video.duration * 1000).format("mm:ss")
        : "";
    return "";
  }

  createdAt(video: VideoDetail) {
    const { createdAt } = video;
    return moment(createdAt).isValid()
      ? moment(createdAt).format("DD/MM/YYYY")
      : "";
  }
}
</script>

<style lang="scss" scoped>
.video-wrapper {
  position: relative;
  .overlay {
    position: absolute;
    opacity: 0.2;
    width: 100%;
    height: 100%;
    background: #ddd;
  }
}

.video-list-item {
  cursor: pointer;
  position: relative;
}
</style>
