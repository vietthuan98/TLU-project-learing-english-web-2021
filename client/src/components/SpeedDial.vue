<template>
  <v-speed-dial
    v-model="fab"
    direction="top"
    :open-on-hover="true"
    transition="slide-y-reverse-transition"
    :bottom="true"
    :right="true"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-account-circle
        </v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green" @click="openArticleCreationPopup">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo" @click="openUploadExcel">
      <v-icon>mdi-microsoft-excel</v-icon>
    </v-btn>
    <v-btn fab dark small color="blue" @click="openUploadVideo">
      <v-icon>mdi-camera-account</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import bus from "../helpers/bus";
import { BUS_EVENTS } from "../helpers/constants";

@Component({})
export default class SpeedDial extends Vue {
  @Prop({ default: null }) private value!: string;
  fab = false;

  openArticleCreationPopup() {
    bus.$emit(BUS_EVENTS.OPEN_ARTICLE_FORM_POPUP);
  }

  openUploadExcel() {
    bus.$emit(BUS_EVENTS.OPEN_EXAM_UPLOAD_EXCEL);
  }

  openUploadVideo() {
    this.$router.push("/videos/upload");
  }
}
</script>

<style lang="scss" scoped></style>
