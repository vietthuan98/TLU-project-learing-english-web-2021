<template>
  <div>
    <VideoUpload
      @on-video-uploaded="onVideoUploaded"
      v-if="!this.videoOption.sources[0].src"
    />
    <v-container id="video-upload-page" v-else>
      <v-row>
        <v-col cols="12" sm="8">
          <VideoPlayer
            :title="title"
            :cues="cues"
            :skip-time="skipTime"
            :options="videoOption"
            :start="start"
            :end="end"
            :isCreate="true"
            @set-start="setStart"
            @set-end="setEnd"
            @set-skip-time="setSkipTime"
            @set-current-time="setCurrentTime"
            @set-duration="setDuration"
          />

          <div class="input-subtitle">
            <v-textarea
              outlined
              label="Translator*"
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
              label="Title*"
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VideoPlayer from "../components/VideoPlayer.vue";
import VideoTranslation from "../components/video-translation/VideoTranslation.vue";
import VideoUpload from "../components/video-upload/VideoUpload.vue";
import Rules from "../../../helpers/rules";
import { CueItem } from "../constants";
import videoAPI from "../service";
import swal from "sweetalert2";

@Component({
  components: {
    VideoPlayer,
    VideoTranslation,
    VideoUpload,
  },
})
export default class VideoUploadPage extends Vue {
  @Prop({ default: null }) private value!: string;
  skipTime = -1;
  currentTime = 0;
  cues: CueItem[] = [];

  title = "";
  description = "";
  duration = 0;
  transText = "";
  start: number | null = null;
  end: number | null = null;

  videoOption = {
    autoplay: true,
    controls: true,
    height: 500,
    sources: [
      {
        // src:
        //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        src: "",
        type: "video/mp4",
      },
    ],
  };

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

  setDuration(time: number) {
    this.duration = time;
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
      duration: this.duration,
      cues: this.cues,
      src: this.videoOption.sources[0].src,
    };
    return params;
  }

  async create() {
    const isValid = this.form.validate();
    if (!isValid) return;
    const params = this.makeParams();
    console.log("params", params);
    await this.$store.dispatch("setLoading", true);
    const response = await videoAPI.create(params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      await swal.fire("", "Your video has been created", "success");
      this.$router.push("/videos");
    } else {
      await swal.fire(
        "",
        response?.message?.toString() || "Something went wrong.",
        "error"
      );
    }
  }

  onVideoUploaded(src: string) {
    this.videoOption.sources[0].src = src;
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
