<template>
  <v-card class="list-item">
    <v-card-title>
      {{ title }}
      <v-spacer />
      <span class="caption">Total: {{ total }}</span>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-list two-line>
        <v-list-item-group active-class="pink--text">
          <template v-for="(item, index) in items">
            <slot :item="item"></slot>
            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ProfilePageList extends Vue {
  @Prop({ default: 0 }) private total!: number;
  @Prop({ default: () => [] }) private items!: Record<string, string>[];
  @Prop({ default: "" }) private title!: string;
}
</script>

<style lang="scss" scoped>
::v-deep.v-card .v-card__title {
  border-bottom: thin solid #ddd;
}

::v-deep .v-list {
  padding: 0;
}

::v-deep .v-item-group {
  max-height: 475px;
  overflow: auto;
}
</style>
