<template>
  <v-app-bar dense elevate-on-scroll hide-on-scroll>
    <!-- <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template> -->
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-app-bar-title>Title</v-app-bar-title>
    <v-spacer></v-spacer>

    <SearchEngine v-if="isShowSeachInput" />
    <v-btn icon @click="isShowSeachInput = !isShowSeachInput">
      <v-icon v-if="!isShowSeachInput">mdi-magnify</v-icon>
      <v-icon v-else>mdi-chevron-right</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <template v-slot:extension>
      <v-tabs align-with-title>
        <template v-for="tab in tabs">
          <v-tab
            :key="tab.name"
            @click="changeTab(tab.to)"
            :class="{ 'tab--active': isActiveTab(tab.segment) }"
            >{{ tab.name }}</v-tab
          >
        </template>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import SearchEngine from "./SearchEngine.vue";

interface Tab {
  id: number;
  name: string;
  to: string;
  segment: string;
}

@Component({
  components: {
    SearchEngine
  }
})
export default class AppBar extends Vue {
  isShowSeachInput = false;
  tabs: Tab[] = [
    { id: 0, name: "Home", to: "/home", segment: "home" },
    { id: 1, name: "Artical", to: "/articles", segment: "articles" },
    { id: 2, name: "Exams", to: "/exams", segment: "exams" },
    { id: 3, name: "Videos", to: "/videos", segment: "videos" }
  ];
  // v-tab--active
  get currentPathName(): string {
    return this.$route.fullPath;
  }

  changeTab(to: string) {
    this.$router.push(to).catch(err => {
      //
    });
  }

  isActiveTab(segment: string) {
    return this.currentPathName.includes(segment);
  }
}
</script>

<style lang="scss" scoped>
header {
  z-index: 100;
}
::v-deep .v-app-bar-title__content {
  width: auto !important;
}
.v-app-bar {
  position: sticky;
  top: 0;
}

::v-deep .v-tabs-slider {
  display: none !important;
}

::v-deep .v-tab--active {
  color: #0000008a !important;
}

::v-deep .tab--active {
  color: #1976d2 !important;
  border-bottom: medium solid #1976d2;
}
</style>
