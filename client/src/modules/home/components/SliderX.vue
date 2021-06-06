<template>
  <div
    class="slider-wrapper"
    @mouseover="isShowIconLeftNRight = true"
    @mouseleave="isShowIconLeftNRight = false"
  >
    <v-icon class="i-left" @click="moveLeft" size="30" v-show="isShowIConLeft">
      mdi-chevron-left
    </v-icon>
    <v-icon
      class="i-right"
      @click="moveRight"
      size="30"
      v-show="isShowIConRight"
      >mdi-chevron-right
    </v-icon>
    <div class="slider d-flex" ref="slider">
      <div
        class="slider-item"
        :width="width"
        v-for="(item, index) in items"
        :key="index"
      >
        <slot name="item" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class SliderX extends Vue {
  @Prop({ default: () => [] }) private items!: unknown[];
  @Prop({ default: 300 }) private width!: number;

  refSlider: HTMLElement | null = null;

  mounted() {
    this.refSlider = this.$refs?.slider as HTMLElement;
  }

  isShowIconLeftNRight = false;

  get isShowIConLeft() {
    return this.isShowIconLeftNRight;
  }

  get isShowIConRight() {
    return this.isShowIconLeftNRight;
  }

  moveLeft() {
    if (this.refSlider) {
      if (!this.refSlider.scrollLeft) {
        const maxScrollLeft =
          (this.refSlider?.scrollWidth || 0) -
          (this.refSlider?.clientWidth || 0);
        this.refSlider.scrollLeft += maxScrollLeft + 15;
      } else {
        this.refSlider.scrollLeft -= this.width + 15;
      }
    }
  }

  moveRight() {
    if (this.refSlider) {
      const maxScrollLeft =
        (this.refSlider?.scrollWidth || 0) - (this.refSlider?.clientWidth || 0);
      if (this.refSlider.scrollLeft >= maxScrollLeft) {
        this.refSlider.scrollLeft -= maxScrollLeft + 15;
      } else {
        this.refSlider.scrollLeft += this.width + 15;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.slider-wrapper {
  width: 100%;
  overflow: hidden;
  height: 330px;
  position: relative;
  .i-left,
  .i-right {
    position: absolute;
    top: 50%;
    color: black;
    opacity: 0.8;
    transform: translateY(-50%);
    background: white;
    z-index: 50;
  }
  .i-left {
    left: 0;
  }
  .i-right {
    right: 0;
  }

  .slider {
    overflow: hidden;
    scroll-behavior: smooth;

    .slider-item {
      margin: 5px 0;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>
