<template>
  <v-btn :href="link" class="primary" text>
    <v-icon class="mr-2">mdi-cloud-download</v-icon> Download excel template
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class DownloadTempFile extends Vue {
  @Prop({ default: null }) private value!: string;

  link =
    "https://res.cloudinary.com/thuanluu/raw/upload/v1620292139/templateFiles/example_upload_template.ods";
}
</script>

<style lang="scss" scoped></style>
