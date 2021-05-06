<template>
  <div id="home-page">
    HomePage
    <DownloadTempFile />
    <UploadExcelButton />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Mixins } from "vue-property-decorator";
import UploadExcelButton from "../../example/components/UploadExcelButton.vue";
import DownloadTempFile from "../../example/components/DownloadTempFile.vue";

@Component({
  components: {
    UploadExcelButton,
    DownloadTempFile,
  },
})
export default class HomePage extends Vue {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped>
#home-page {
  width: 100vw;
}
</style>
