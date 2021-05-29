<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-checkbox
        class="ml-auto"
        hide-details
        v-bind="attrs"
        v-on="on"
        v-model="allowFocus"
      />
    </template>
    <span>Check to auto focus</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class VideoTranslationCheckbox extends Vue {
  @Prop({ default: true }) private value!: boolean;

  get allowFocus() {
    return this.value;
  }

  set allowFocus(val: boolean) {
    this.$emit("input", val);
  }
}
</script>

<style lang="scss" scoped></style>
