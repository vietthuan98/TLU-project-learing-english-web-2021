<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        @click="changeRoute(item.to)"
        :disabled="item.disabled"
      >
        {{ item.text.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

export interface BreadCrumb {
  text: string;
  to: string;
  disabled?: boolean;
}

@Component({})
export default class VBreadCrumbs extends Vue {
  @Prop({ default: null }) private value!: string;
  @Prop({ default: () => ({}) }) items!: BreadCrumb;

  changeRoute(to: string) {
    if (to) this.$router.push(to);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-breadcrumbs__item {
  cursor: pointer;
}
</style>
