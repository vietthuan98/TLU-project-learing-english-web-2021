<template>
  <v-container
    class="video-detail-page"
    :key="`video-detail-page-${videoDetail._id}`"
  >
    <v-icon class="icon-delete" @click="deleteItem" color="black"
      >mdi-trash-can</v-icon
    >
    <common-v-bread-crumbs :items="breadCrumbs" />
    <v-container id="video-upload-page">
      <v-row>
        <v-col cols="12" sm="8">
          <VideoPlayer
            v-if="!isLoading"
            :title="videoDetail.title"
            :cues="cues"
            :skip-time="skipTime"
            :options="videoOption"
            @set-skip-time="setSkipTime"
            @set-current-time="setCurrentTime"
          />
          <v-card class="mb-3">
            <v-card-title>
              {{ videoDetail.title }}
            </v-card-title>
            <v-card-subtitle class="d-flex justify-space-between">
              <div>
                By <strong>{{ author.name }}</strong> - At:
                {{ createdAt }}
              </div>
              <div class="d-flex">
                <v-icon
                  :color="this.isLiked ? 'primary' : 'blue'"
                  size="20"
                  @click="likeVideo"
                  >mdi-thumb-up</v-icon
                >
                <div class="ml-1 like-number">{{ likes.length }}</div>
              </div>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text class="description"
              >{{ videoDetail.description }}
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>Comments</v-card-title>
            <template v-if="comments.length">
              <v-card-text v-for="(comment, index) in comments" :key="index">
                <div
                  class="comment-item"
                  @mouseenter="showCommentDelete(true, index)"
                  @mouseleave="showCommentDelete(false, index)"
                >
                  <v-icon
                    size="18"
                    class="icon-delete"
                    v-if="comment.yours"
                    v-show="comment.isShow"
                    @click="deleteComment(comment._id)"
                  >
                    mdi-close-circle
                  </v-icon>
                  <div class="font-weight-bold">
                    {{ comment.userId.name }}
                  </div>
                  <div>{{ comment.message }}</div>
                </div>
              </v-card-text>
            </template>
            <v-divider></v-divider>
            <v-form ref="form">
              <v-card-text class="pb-0"
                ><v-textarea
                  v-model="comment"
                  outlined
                  :rules="[rules.vCommentLength]"
                  placeholder="Leave your comment"
                  @keyup.enter="leaveComment"
              /></v-card-text>
            </v-form>
            <v-card-actions>
              <v-btn class="primary ml-auto pt-0" @click="leaveComment">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <VideoTranslation
            :cues="cues"
            @set-cue="setCue"
            :currentTime="currentTime"
          />
          <VideoRecommendation @on-get-video-detail="getVideoDetail" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import VideoPlayer from "../components/VideoPlayer.vue";
import VideoTranslation from "../components/video-translation/VideoTranslation.vue";
import VideoRecommendation from "../components/VideoRecommendation.vue";
import { VideoDetail, CueItem, VideoForm } from "../constants";
import TokenService from "../../../helpers/token";
import rules from "../../../helpers/rules";
import moment from "moment";
import VideoAPI from "../service";
import {
  confirmDelete,
  successMessage,
  errorMessage,
} from "../../../helpers/functions";

@Component({
  components: {
    VideoPlayer,
    VideoTranslation,
    VideoRecommendation,
  },
})
export default class VideoDetailPage extends Vue {
  isLoading = false;
  currentTime = 0;
  skipTime = -1;
  comment = "";
  rules = rules;

  async created() {
    await this.getVideoDetail(this.$route.params.id);
  }

  async getVideoDetail(id: string) {
    this.isLoading = true;
    await this.$store.dispatch("setLoading", true);
    const response = await this.$store.dispatch("videos/getVideoDetail", id);
    await this.$store.dispatch("setLoading", false);
    this.isLoading = false;
    if (!response.success) {
      this.$router.push("/videos");
    }
  }

  get videoOption() {
    return {
      autoplay: true,
      controls: true,
      height: 500,
      sources: [
        {
          src: this.videoDetail.src,
          type: "video/mp4",
        },
      ],
    };
  }

  get breadCrumbs() {
    return [
      {
        text: "Video list",
        to: "/videos",
        disabled: false,
      },
      {
        text: "Video detail",
        to: "#",
        disabled: true,
      },
    ];
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  get videoDetail(): VideoDetail {
    return this.$store.state.videos?.videoDetail || {};
  }

  get comments() {
    return this.videoDetail.comments || [];
  }

  get likes() {
    return this.videoDetail.likes || [];
  }

  get author() {
    return this.videoDetail.author || {};
  }

  get createdAt() {
    const time = this.videoDetail.createdAt;
    return moment(time).isValid() ? moment(time).format("DD/MM/YY hh:mm") : "";
  }

  get cues() {
    return this.videoDetail.cues || [];
  }

  get isLiked() {
    if (!this.likes.length) return false;
    return this.likes.some((like) => like._id === TokenService.getUser()._id);
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

  showCommentDelete(isShow = false, index: number) {
    if (this.videoDetail.comments?.length) {
      this.videoDetail.comments[index].isShow = isShow;
      this.$store.commit("videos/setDetail", { ...this.videoDetail });
    }
  }

  async likeVideo() {
    await this.updateVideo({ like: !this.isLiked } as VideoForm);
  }

  async leaveComment() {
    const isValid = await this.form.validate();
    if (!isValid || !this.comment) return;
    const response = await this.updateVideo({
      comment: this.comment,
    } as VideoForm);
    if (response.success) this.comment = "";
  }

  async deleteComment(id: string) {
    await this.updateVideo({ deletedCommentId: id } as VideoForm);
  }

  async updateVideo(data: VideoForm) {
    await this.$store.dispatch("setLoading", true);
    const resposne = await this.$store.dispatch("videos/updateVideoDetail", {
      id: this.videoDetail._id,
      data,
    });
    await this.$store.dispatch("setLoading", false);
    return resposne;
  }

  async deleteItem() {
    const confirm = await confirmDelete();
    if (!confirm) return;
    const id = this.videoDetail._id as string;
    await this.$store.dispatch("setLoading", true);
    const response = await VideoAPI.delete(id);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      await successMessage(response.message);
      this.$router.push("/videos");
    } else {
      await errorMessage(response.message);
    }
  }
}
</script>

<style lang="scss" scoped>
.video-detail-page {
  height: 100vh;
  position: relative;
}

.icon-delete {
  position: absolute;
  right: 0;
  transform: translate(-100%, 50%);
}

.like-number {
  user-select: none;
}

.comment-item:hover {
  background-color: #ddd;
}

.comment-item {
  position: relative;

  .icon-delete {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
