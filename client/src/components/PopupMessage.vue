<template>
  <v-snackbar :value="snackbar">
    <v-alert class="mb-0" dense text :type="isError ? 'success' : 'error'">
      {{ text }}
    </v-alert>
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="close" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ROOT_MUTATION } from "../store";

interface Message {
  id: string;
  message: string;
  isError: boolean;
}

@Component({})
export default class PopupMessage extends Vue {
  @Prop({ required: true }) private index!: number;
  @Prop({ default: () => ({}) }) private message!: Message;

  get snackbar() {
    return !!this.message?.message || "";
  }

  get text() {
    return this.message?.message || "";
  }
  get isError() {
    return this.message?.isError;
  }

  close() {
    this.$store.commit(ROOT_MUTATION.DELETE_POPUP_MESSAGE, this.index);
  }

  created() {
    setTimeout(() => {
      this.close();
    }, 1000);
  }
}
</script>

<style lang="scss" scoped></style>
