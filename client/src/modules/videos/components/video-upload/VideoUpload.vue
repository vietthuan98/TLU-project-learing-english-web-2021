<template>
  <v-dialog v-model="dialog" persistent width="600">
    <v-card>
      <v-card-actions
        ><v-file-input
          accept="video/mp4,video/x-m4v,video/*"
          label="Video file"
          name="video"
          show-size
          @change="uploadVideo"
        ></v-file-input
      ></v-card-actions>
      <v-card-actions>
        <v-btn class="white ml-auto" @click="back">Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import videoApi from "../../service";
import swal from "sweetalert2";

@Component({})
export default class extends Vue {
  dialog = true;

  async uploadVideo(file: string) {
    if (!file) return;
    const formData = new FormData();
    formData.append("video", file);
    await this.$store.dispatch("setLoading", true);
    const response = await videoApi.uploadVideo(formData);
    await this.$store.dispatch("setLoading", false);
    if (response?.success) {
      await swal.fire("", "Your image uploaded", "success");
      this.$emit("on-video-uploaded", response.data.url);
      this.dialog = false;
    } else {
      await swal.fire("", "Some thing went wrong", "error");
    }
  }

  back() {
    this.$router.push("/videos");
  }
}
</script>

<style lang="scss" scoped></style>
