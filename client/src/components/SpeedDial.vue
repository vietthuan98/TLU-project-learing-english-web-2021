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
    <v-btn fab dark small color="indigo">
      <v-icon>mdi-plus</v-icon>
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
    bus.$emit(BUS_EVENTS.OPEN_ARTICLE_CREATION_POPUP);
  }
}
</script>

<style lang="scss" scoped></style>
