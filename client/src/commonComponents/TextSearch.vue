<template>
  <div class="text-search-container">
    <label v-if="label" :for="kInput">{{ label }}</label>
    <div class="input-group">
      <input
        :id="kInput"
        v-model="inputVal"
        :placeholder="placeholder"
        @keydown.enter="search"
      />
      <v-icon size="25">mdi-magnify</v-icon>
    </div>
    <v-btn @click="search" class="primary">Search</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class TextSearch extends Vue {
  @Prop({ default: null }) private value!: string;
  @Prop({ default: "" }) private label!: string;
  @Prop({ default: "" }) private placeholder!: string;
  kInput = (Date.now() % 312) * 331;

  get inputVal() {
    return this.value;
  }

  set inputVal(val: string) {
    this.$emit("input", val);
  }

  search() {
    this.$emit("search", this.inputVal);
  }
}
</script>

<style lang="scss" scoped>
.text-search-container {
  display: flex;
  align-items: center;
  .input-group {
    position: relative;
    flex-basis: 100%;
    margin-right: 16px;
  }

  .v-icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(25%, -50%);
  }

  .v-btn {
    width: 80px;
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
    padding: 0 8px 0 40px;

    &:focus {
      border: 1px solid #68b5f3c7;
      transition: border 0.3s ease-in;
    }
  }
}
</style>
