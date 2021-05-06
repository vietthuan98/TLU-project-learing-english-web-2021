<template>
  <div id="home-page">
    HomePage
    <UploadExcelButton @onUploadFile="onUploadFile" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Mixins } from "vue-property-decorator";
import UploadExcelButton from "../../example/components/UploadExcelButton.vue";
import ExampleMixins from "../../example/mixins/example.mixins";

@Component({
  components: {
    UploadExcelButton
  }
})
export default class HomePage extends Mixins(ExampleMixins) {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped>
#home-page {
  width: 100vw;
}
</style>
