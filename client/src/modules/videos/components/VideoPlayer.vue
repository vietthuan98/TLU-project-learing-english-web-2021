<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
    <slot name="track"></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import videojs, { VideoJsPlayerOptions } from "video.js";

@Component({})
export default class extends Vue {
  @Prop({ default: () => ({}) }) private options!: VideoJsPlayerOptions;
  player = null;

  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  }

  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "video.js/dist/video-js.css";
</style>
