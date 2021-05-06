<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item>
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
      to: "/articles"
    },
    {
      text: "Article detail"
    }
  ];

  toArticlePage() {
    this.$router.push("/articles");
  }
}
</script>

<style lang="scss" scoped></style>
