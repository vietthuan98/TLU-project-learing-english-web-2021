<template>
  <v-alert class="text-error" dense outlined type="error">
    {{ message }}
  </v-alert>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ErrorText extends Vue {
  @Prop({ default: "" }) message!: string;
}
</script>

<style lang="scss" scoped></style>
