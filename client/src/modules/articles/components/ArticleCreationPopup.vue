<template>
  <div>
    <v-dialog
      v-model="isVisible"
      scrollable
      persistent
      @keydown.esc="closeDialog"
      width="850"
    >
      <v-card>
        <v-card-title>
          Create a new article
        </v-card-title>
        <v-card-text class="pt-2">
          <v-text-field
            label="Title"
            v-model="title"
            :rules="[Rules.required]"
            persistent-hint
            outlined
            dense
          />
          <v-file-input
            placeholder="File input"
            dense
            show-size
            :accept="acceptFile"
            :clearable="false"
            name="image"
            @change="uploadImage"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn class="white ml-auto">Close</v-btn>
          <v-btn class="primary ">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import bus from "../../../helpers/bus";
import { BUS_EVENTS } from "../../../helpers/constants";
import { ArticleDetail } from "../constants";
import Rules from "../../../helpers/rules";

@Component({})
export default class ArticleCreationPopup extends Vue {
  isVisible = false;
  acceptFile = "image/png, image/jpeg, image/ipg";
  title = "";

  async uploadImage(file: Record<string, unknown>) {
    await this.$store.dispatch("setLoading", true);
    const response = await this.$store.dispatch("articles/uploadImage", file);
    await this.$store.dispatch("setLoading", false);
    console.log("response", response);
  }

  get Rules() {
    return Rules;
  }

  mounted() {
    bus.$on(BUS_EVENTS.OPEN_ARTICLE_CREATION_POPUP, this.openDialog);
  }

  beforeDestroy() {
    bus.$off(BUS_EVENTS.OPEN_ARTICLE_CREATION_POPUP);
  }

  openDialog() {
    this.isVisible = true;
  }

  closeDialog() {
    this.isVisible = false;
  }
}
</script>

<style lang="scss" scoped></style>
