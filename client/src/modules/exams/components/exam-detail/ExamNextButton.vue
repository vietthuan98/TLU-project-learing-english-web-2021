<template>
  <div>
    <v-btn icon :disabled="disabled" @click="onClick">
      <v-icon color="primary" size="55"
        >mdi-arrow-right-drop-circle-outline</v-icon
      >
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ExamNextButton extends Vue {
  @Prop({ default: null }) private value!: string;
  @Prop({ default: false }) disabled!: boolean;

  onClick() {
    this.$emit("on-click");
  }
}
</script>

<style lang="scss" scoped></style>
