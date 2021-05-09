<template>
  <p>Exam detalil:</p>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import examApi from "../service";

@Component({})
export default class ExamDetailPage extends Vue {
  @Prop({ default: null }) private value!: string;

  async created() {
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("exams/getExamDetail", this.$route.params.id);
    await this.$store.dispatch("setLoading", false);
  }
}
</script>

<style lang="scss" scoped></style>
