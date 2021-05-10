<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item @click="changeRoute(item)" :disabled="item.disabled">
        {{ item.text.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ArticleDetailBreadCrumbs extends Vue {
  @Prop({ default: null }) private value!: string;
  items = [
    {
      text: "Article list",
      to: "/articles",
      disabled: false,
    },
    {
      text: "Article detail",
      to: "#",
      disabled: true,
    },
  ];

  changeRoute(item: Record<string, string>) {
    this.$router.push(item.to);
  }
}
</script>

<style lang="scss" scoped></style>
