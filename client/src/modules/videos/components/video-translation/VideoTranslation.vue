<template>
  <v-card>
    <v-toolbar color="pink" dark>
      <v-toolbar-title>All script</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item-group>
        <template v-if="items.length">
          <template v-for="(item, index) in items">
            <v-list-item
              active-class="pink--text"
              :key="index"
              @click="setCue(item)"
              v-model="item.selected"
              :input-value="item.selected"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="index < items.length - 1"
              :key="index + 'divider'"
            ></v-divider>
          </template>
        </template>
        <template v-else>
          <v-list-item disabled>
            <v-list-item-content>
              <v-list-item-title>Please add more subtitle</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { CueItem } from "../../../../plugins/webvtt";
import moment from "moment";

interface DisplayCue extends CueItem {
  title: string;
  selected: boolean;
}

@Component({})
export default class VideoTranslation extends Vue {
  @Prop({ default: () => [] }) private cues!: CueItem[];
  @Prop({ default: 0 }) private currentTime!: number;

  get items(): DisplayCue[] {
    return this.cues.map((item) => ({
      ...item,
      title: `${this.formatTime(item.start)} ~ ${this.formatTime(item.end)}`,
      selected: this.checkActiveScript(item),
    }));
  }

  formatTime(time: number) {
    return moment.utc(time * 1000).format("mm:ss");
  }

  setCue(item: CueItem) {
    this.$emit("set-cue", item);
  }

  checkActiveScript(item: CueItem) {
    if (
      this.currentTime >= 0 &&
      item.start <= this.currentTime &&
      this.currentTime <= item.end
    ) {
      return true;
    }
    return false;
  }
}
</script>

<style lang="scss" scoped></style>
