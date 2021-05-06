<template>
  <v-alert dense outlined>
    <v-list-item-content v-for="(message, index) in messageList" :key="index">
      {{ message }}
    </v-list-item-content>
  </v-alert>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ErrorText extends Vue {
  @Prop({ default: () => [] }) messageList!: string[];
}
</script>

<style lang="scss" scoped>
.v-alert {
  max-height: 100px;
  overflow: auto;
  border: thick solid #bf3737 !important;
  background: #ffc0c0 !important;
}
.v-list-item__content {
  padding: 5px 0;
}
</style>
