<template>
  <v-main class="main-layout">
    <AppBar />
    <router-view />
    <SpeedDial id="speed-dial" />
    <ArticleCreationPopup />
    <Footer />
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SpeedDial from "../SpeedDial.vue";
import AppBar from "../AppBar.vue";
import Footer from "../Footer.vue";
import ArticleCreationPopup from "../../modules/articles/components/ArticleCreationPopup.vue";

@Component({
  components: {
    AppBar,
    Footer,
    SpeedDial,
    ArticleCreationPopup,
  },
})
export default class MainLayout extends Vue {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped>
.main-layout {
  position: relative;
  .v-speed-dial {
    position: absolute;
  }
}
</style>
