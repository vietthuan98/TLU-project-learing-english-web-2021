<template>
  <v-text-field
    v-model="email"
    :label="label"
    :rules="[Rules.required, Rules.validEmail]"
    :append-icon="appendIcon"
    persistent-hint
    outlined
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class TextInput extends Vue {
  @Prop({ default: null }) private value!: string;
  @Prop({ default: "" }) label!: string;
  @Prop({ default: [] }) rules!: unknown[];
  @Prop({ default: [] }) appendIcon!: unknown[];

  get currentValue() {
    return this.value;
  }

  set currentValue(value: string) {
    this.$emit("input", value);
  }
}
</script>

<style lang="scss" scoped></style>
