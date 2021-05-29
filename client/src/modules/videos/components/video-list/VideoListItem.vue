<template>
  <v-card
    class="video-list-item"
    @click="getVideoDetail"
    @mouseenter="isShowPauseIcon = true"
    @mouseleave="isShowPauseIcon = false"
  >
    <v-card-text class="pb-0">
      <div class="video-wrapper">
        <div class="overlay d-flex justify-center align-center">
          <v-icon v-show="isShowPauseIcon" size="150" color="black">
            mdi-motion-play-outline
          </v-icon>
        </div>
        <video class="video-item" width="100%" height="100%">
          <source :src="video.src" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </v-card-text>
    <v-card-title>
      {{ video.title }}
    </v-card-title>
    <v-card-subtitle>
      <div>By {{ video.author.name }}</div>
      <div class="d-flex justify-space-between">
        <div>{{ createdAt }}</div>
        <div>Time: {{ duration }}</div>
      </div>
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { VideoDetail } from "../../constants";
import moment from "moment";

@Component({})
export default class VideoListItem extends Vue {
  @Prop({ default: () => ({}) }) private video!: VideoDetail;
  isShowPauseIcon = false;

  get createdAt() {
    const { createdAt } = this.video;
    return moment(createdAt).isValid()
      ? moment(createdAt).format("DD/MM/YYYY")
      : "";
  }

  async getVideoDetail() {
    this.$router.push("/videos/" + this.video._id);
  }

  get duration() {
    if (this.video.duration)
      return moment(this.video.duration).isValid()
        ? moment.utc(this.video.duration * 1000).format("mm:ss")
        : "";
    return "";
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

.video-item {
  border: 1px solid #ddd;
}
</style>
