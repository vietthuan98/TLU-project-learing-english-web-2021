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
          <v-tab :key="tab.name" @click="changeTab(tab.to)">{{
            tab.name
          }}</v-tab>
        </template>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import SearchEngine from "./SearchEngine.vue";

@Component({
  components: {
    SearchEngine
  }
})
export default class AppBar extends Vue {
  isShowSeachInput = false;
  tabs = [
    { id: 0, name: "Home", to: "/home" },
    { id: 1, name: "Artical", to: "/articles" },
    { id: 2, name: "Exams", to: "/exams" },
    { id: 3, name: "Video", to: "/videos" }
  ];

  changeTab(to: string) {
    this.$router.push(to).catch(err => {
      //
    });
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
// header,
// ::v-deep .v-slide-group__wrapper .v-slide-group__content,
// .v-icon {
//   color: #fff !important;
// }
</style>
