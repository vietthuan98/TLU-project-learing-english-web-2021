<template>
  <v-card class="video-translation" ref="videoTranslation">
    <v-toolbar class="video-translation__title" color="pink" dark>
      <v-toolbar-title>All script</v-toolbar-title>
      <VideoTranslationCheckbox v-model="allowFocus" />
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
              :class="item.selected ? 'active-cue' : ''"
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
import { CueItem } from "../../constants";
import moment from "moment";
import orderBy from "lodash/orderBy";
import VideoTranslationCheckbox from "./VideoTranslationCheckbox.vue";

interface DisplayCue extends CueItem {
  title: string;
  selected: boolean;
}

@Component({
  components: {
    VideoTranslationCheckbox
  }
})
export default class VideoTranslation extends Vue {
  @Prop({ default: () => [] }) private cues!: CueItem[];
  @Prop({ default: 0 }) private currentTime!: number;
  allowFocus = true;

  get items(): DisplayCue[] {
    const parsedItems = this.cues.map(item => ({
      ...item,
      title: `${this.formatTime(item.start)} ~ ${this.formatTime(item.end)}`,
      selected: this.checkActiveScript(item)
    }));
    return orderBy(parsedItems, ["start", "end"], ["asc", "asc"]);
  }

  formatTime(time: number) {
    return moment.utc(time * 1000).format("mm:ss:SS");
  }

  setCue(item: CueItem) {
    this.$emit("set-cue", item);
  }

  checkActiveScript(item: CueItem) {
    let isActive = false;
    if (
      this.currentTime >= 0 &&
      item.start <= this.currentTime &&
      this.currentTime <= item.end
    ) {
      isActive = true;
    }
    if (isActive) {
      this.handleScroll();
    }
    return isActive;
  }

  handleScroll() {
    const container = document.querySelector(
      ".video-translation"
    ) as HTMLElement;
    const activedEl = document.querySelector(".active-cue") as HTMLElement;

    if (container && activedEl) {
      if (this.allowFocus) {
        const distance = activedEl.offsetTop;
        container.scrollTop = distance;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-translation {
  max-height: 620px;
  overflow: auto;
  position: relative;
  scroll-behavior: smooth;

  &__title {
    position: sticky;
    top: 0;
    z-index: 99;
  }
}

.v-list-item__subtitle {
  overflow: visible;
  white-space: normal;
}
</style>
