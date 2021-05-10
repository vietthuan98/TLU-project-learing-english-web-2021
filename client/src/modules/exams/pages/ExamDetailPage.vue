<template>
  <v-container>
    <CommonVBreadCrumbs :items="breadCrumbs" />
    <ExamPractice />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ExamPractice from "../components/exam-detail/ExamPractice.vue";
import { ExamDetail } from "../constants";
import examApi from "../service";

@Component({
  components: {
    ExamPractice,
  },
})
export default class ExamDetailPage extends Vue {
  @Prop({ default: null }) private value!: string;

  get examDetail(): ExamDetail {
    return this.$store.state.exams?.examDetail || {};
  }

  get breadCrumbs() {
    return [
      {
        text: "Exam list",
        to: "/exams",
        disabled: false,
      },
      {
        text: "Exam detail",
        to: "#",
        disabled: true,
      },
    ];
  }

  async created() {
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("exams/getExamDetail", this.$route.params.id);
    await this.$store.dispatch("setLoading", false);
  }
}
</script>

<style lang="scss" scoped></style>
