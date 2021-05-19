<template>
  <div>
    <video ref="videoPlayer" class="video-js">
      <slot name="track"></slot>
    </video>
    <div class="time-action">
      <div class="caption">
        <div><strong>Note: </strong></div>
        <div class="pl-2">
          <div>
            Click <v-icon color="primary">mdi-record</v-icon> to set start time
            of a subtitle.
          </div>
          <div>
            Click <v-icon color="red">mdi-record</v-icon> to set end time of a
            subtitle.
          </div>
          <div>
            Click <v-icon color="error">mdi-close-thick</v-icon> to clear
            current time.
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="d-flex timer">
          <div class="time">
            Start <strong>{{ displayStart }}</strong>
          </div>
          <v-icon color="black">mdi-arrow-right</v-icon>
          <div class="time">
            End <strong>{{ displayEnd }}</strong>
          </div>
        </div>
        <v-btn
          v-if="!start"
          color="primary"
          :disabled="disabledStart"
          @click="setStart"
          icon
        >
          <v-icon>mdi-record</v-icon>
        </v-btn>
        <v-btn v-else color="red" icon :disabled="disabledEnd" @click="setEnd">
          <v-icon>mdi-record</v-icon>
        </v-btn>
        <v-btn color="error" :disabled="disabledClear" @click="clear" icon>
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from "video.js";
import { configUserActions } from "../constants/utils";
import moment from "moment";

@Component({})
export default class extends Vue {
  @Prop({ default: -1 }) skipTime!: number;
  @Prop({ default: () => ({}) }) private options!: VideoJsPlayerOptions;
  @Prop({ required: true }) start!: number | null;
  @Prop({ required: true }) end!: number | null;
  player: VideoJsPlayer | null = null;
  curTime = 0;

  get currentTime() {
    return this.player ? this.player.currentTime() : 0;
  }

  get displayStart() {
    const time = this.start || this.currentTime;
    return moment(time).isValid()
      ? moment.utc(time * 1000).format("mm:ss")
      : "";
  }

  get displayEnd() {
    const time = !this.start ? this.end : this.currentTime;
    return moment(time).isValid()
      ? moment.utc((time || 0) * 1000).format("mm:ss")
      : "";
  }

  get displayDuration() {
    return moment(this.durationTime).isValid()
      ? moment.utc((this.durationTime || 0) * 1000).format("mm:ss")
      : "";
  }

  get durationTime() {
    if (this.player) return this.player?.duration();
    return 0;
  }

  get disabledStart() {
    return !!this.start || this.currentTime === this.durationTime;
  }

  get disabledEnd() {
    return !!this.end;
  }

  get disabledClear() {
    return !this.start && !this.end;
  }

  setStart() {
    if (this.player) {
      this.$emit("set-start", this.player.currentTime());
      this.player.play();
    }
  }

  setEnd() {
    if (this.player) {
      this.$emit("set-end", this.player.currentTime());
      this.player.pause();
    }
  }

  clear() {
    this.$emit("set-start", null);
    this.$emit("set-end", null);
    if (this.player) {
      this.player.play();
    }
  }

  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      {
        ...this.options,
        userActions: {
          hotkeys: (e) => {
            if (this.player) configUserActions(e, this.player);
          },
        },
      },
      () => {
        if (this.player) this.player.volume(0);
      }
    ) as VideoJsPlayer;
  }

  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  @Watch("skipTime", { immediate: true })
  onSkipTimeChange(val: number) {
    if (this.player && val >= 0) {
      this.player.currentTime(val);
      this.$emit("set-skip-time", -1);
    }
  }

  @Watch("currentTime", { immediate: true })
  oncurrentTimeChange(val: number) {
    if (this.player) {
      this.$emit("set-current-time", val);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../node_modules/video.js/dist/video-js.min.css";

.video-js {
  width: 100% !important;
}

.time {
  width: 100px;
}

.timer {
  height: 36px;
  align-items: center;
}

.time-action {
  display: flex;
  justify-content: space-between;
}

@media only screen and (max-width: 920px) {
  .time-action {
    display: flex;
    flex-direction: column;
  }
}
</style>
