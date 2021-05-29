<template>
  <div>
    <video ref="videoPlayer" class="video-js">
      <slot name="track"></slot>
      Your browser does not support HTML5 video.
    </video>
    <div v-if="isCreate" class="time-action">
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
import { CueItem } from "../constants";
import last from "lodash/last";
import moment from "moment";

@Component({})
export default class extends Vue {
  @Prop({ default: () => [] }) private cues!: CueItem[];
  @Prop({ default: -1 }) skipTime!: number;
  @Prop({ default: () => ({}) }) private options!: VideoJsPlayerOptions;
  @Prop({ default: 0 }) start!: number | null;
  @Prop({ default: 0 }) end!: number | null;
  @Prop({ default: "" }) title!: string;
  @Prop({ default: false }) isCreate!: boolean;
  player: VideoJsPlayer | null = null;
  curTime = 0;
  track: TextTrack | null = null;

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
    this.initVideo();
    this.initTrack();
    if (!this.isCreate && this.cues && this.track) {
      this.addCuesToTrack(this.cues, this.track);
    }
  }

  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    if (this.track) {
      this.track = null;
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

  get cuesLength() {
    return this.cues.length;
  }

  initVideo() {
    this.player = videojs(
      this.$refs.videoPlayer,
      {
        ...this.options,
        userActions: {
          hotkeys: e => {
            if (this.player) configUserActions(e, this.player);
          }
        }
      },
      () => {
        if (this.player) {
          this.player.volume(0); //TODO set volumn
        }
      }
    ) as VideoJsPlayer;
  }

  initTrack() {
    const video = document.querySelector("video");
    if (video) {
      this.emitDuration(video);
      this.track = video.addTextTrack("subtitles", this.title, "en");
      this.track.mode = "showing";
    }
  }

  emitDuration(video: HTMLVideoElement) {
    video.onloadedmetadata = () => {
      this.$emit("set-duration", video.duration);
    };
  }

  @Watch("cuesLength", { immediate: true })
  onCuesChange() {
    if (this.track && this.cues && this.cues.length) {
      if (this.isCreate)
        this.addLastCueToTrack(last(this.cues) as CueItem, this.track);
      else this.addCuesToTrack(this.cues, this.track);
    }
  }

  addCuesToTrack(cues: CueItem[], track: TextTrack) {
    for (let i = 0; i < cues.length; i++) {
      track.addCue(new VTTCue(cues[i].start, cues[i].end, cues[i].text));
    }
  }

  addLastCueToTrack(cue: CueItem, track: TextTrack) {
    track.addCue(new VTTCue(cue.start, cue.end, cue.text));
  }
}
</script>

<style lang="scss" scoped>
@import "../../../plugins/css/video-js.min.css";

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
