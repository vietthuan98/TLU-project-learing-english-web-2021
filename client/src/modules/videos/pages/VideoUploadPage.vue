<template>
  <v-container id="video-upload-page">
    <v-row>
      <v-col cols="12" sm="8">
        <VideoPlayer
          :skip-time="skipTime"
          :options="videoOption"
          :start="start"
          :end="end"
          @set-start="setStart"
          @set-end="setEnd"
          @set-skip-time="setSkipTime"
          @set-current-time="setCurrentTime"
        />

        <div class="input-subtitle">
          <v-textarea
            outlined
            label="Translator"
            v-model="transText"
            class="mt-4"
            :rules="[rules.required, rules.vSubtitleLength]"
          />
          <v-btn
            :disabled="disabledAddSubtitle"
            class="primary btn-add-sub"
            @click="addSubtitle"
            >Add subtitle</v-btn
          >
        </div>
        <v-form ref="form">
          <v-text-field
            class="mt-4"
            dense
            outlined
            label="Title"
            v-model="title"
            :rules="[rules.required, rules.vTitleLength]"
          />
          <v-textarea
            dense
            outlined
            label="Description"
            v-model="description"
            :rules="[rules.vDescriptionLength]"
          />
          <div class="d-flex">
            <v-btn
              :disabled="disabledCreateVideo"
              class="primary ml-auto"
              @click="create"
              >Create video</v-btn
            >
          </div>
        </v-form>
      </v-col>
      <v-col cols="12" sm="4">
        <VideoTranslation
          :cues="cues"
          @set-cue="setCue"
          :currentTime="currentTime"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        comments
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VideoPlayer from "../components/VideoPlayer.vue";
import VideoTranslation from "../components/video-translation/VideoTranslation.vue";
import Rules from "../../../helpers/rules";
import WebVtt, { CueItem } from "../../../plugins/webvtt";

@Component({
  components: {
    VideoPlayer,
    VideoTranslation,
  },
})
export default class VideoUploadPage extends Vue {
  @Prop({ default: null }) private value!: string;
  skipTime = -1;
  currentTime = 0;
  cues: CueItem[] = [];

  title = "";
  description = "";
  transText = "";
  start: number | null = null;
  end: number | null = null;

  get videoOption() {
    return {
      autoplay: true,
      controls: true,
      height: 500,
      sources: [
        {
          src:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          type: "video/mp4",
        },
      ],
    };
  }

  get disabledAddSubtitle() {
    return !this.start || !this.end || !this.transText;
  }

  get disabledCreateVideo() {
    return !this.cues.length || !this.title;
  }

  get rules() {
    return Rules;
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  setStart(start: number | null) {
    this.start = start;
  }

  setEnd(end: number | null) {
    this.end = end;
  }

  clearCurrentData() {
    this.transText = "";
    this.start = null;
    this.end = null;
  }

  setCue(cue: CueItem) {
    this.setSkipTime(cue.start);
  }

  setSkipTime(time: number) {
    this.skipTime = time;
  }

  setCurrentTime(time: number) {
    this.currentTime = time;
  }

  addSubtitle() {
    if (this.start && this.end && this.transText) {
      this.cues.push({
        identifier: `${this.cues.length + 1}`,
        start: this.start,
        end: this.end,
        text: this.transText,
        styles: "",
      });
      this.clearCurrentData();
    }
  }

  makeParams() {
    const params = {
      title: this.title,
      description: this.description,
      cues: this.cues,
    };
    return params;
  }

  async create() {
    const isValid = this.form.validate();
    if (!isValid) return;
    const params = this.makeParams();
    const vttFile = WebVtt.compile(this.cues);
    //upload vttFile to cloud return url
    //save video
  }
}
</script>

<style lang="scss" scoped>
#video-upload-page {
  height: 100vh;
}

.input-subtitle {
  position: relative;

  .btn-add-sub {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(10px);
  }
}
</style>
