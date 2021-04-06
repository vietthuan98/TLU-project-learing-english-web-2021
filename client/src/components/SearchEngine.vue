<template>
  <div class="search-engine d-flex">
    <v-select
      class="pr-2 search-engine__select"
      :items="searchByList"
      v-model="searchBy"
      :append-icon="!searchBy ? '$dropdown' : ''"
      label="Search by"
      single-line
      clearable
      dense
      flat
    ></v-select>
    <v-text-field
      class="search-engine__input"
      v-model="keyword"
      placeholder="keyword"
      dense
      append-icon="mdi-magnify"
      @click:append="onSearch"
      @keypress="onSearch"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { ROOT_MUTATION } from "../store";

@Component({})
export default class SearchEngine extends Vue {
  searchByList = ["Article", "Videos"];
  searchBy = "";
  keyword = "";

  get searchEngine() {
    return this.$store.state?.searchEngine || {};
  }

  onSearch() {
    this.$store.commit(`${ROOT_MUTATION.SET_SEARCH_ENGINE}`, {
      keyword: this.keyword,
      searchBy: this.searchBy,
    });
    console.log("onsearch"); //TODO search here
  }

  @Watch("searchEngine", { deep: true, immediate: true })
  onSearchEngineChange() {
    this.keyword = this.searchEngine.keyword;
    this.searchBy = this.searchEngine.searchBy;
  }
}
</script>

<style lang="scss" scoped>
.search-engine {
  &__select {
    max-width: 145px;
  }
  ::v-deep .v-input__control .v-text-field__details {
    display: none;
  }
}
</style>
