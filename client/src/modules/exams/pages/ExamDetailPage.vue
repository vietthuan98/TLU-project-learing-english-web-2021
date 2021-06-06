<template>
  <v-container>
    <CommonVBreadCrumbs :items="breadCrumbs" />
    <ExamPractice v-if="isStart" @rework="onRework" :key="examPracticeKey" />
    <ExamPracticeIntro v-else>
      <template v-slot:button-start>
        <v-btn class="primary" @click="start">
          START
        </v-btn>
      </template>
    </ExamPracticeIntro>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ExamPractice from "../components/exam-detail/ExamPractice.vue";
import ExamPracticeIntro from "../components/exam-detail/ExamPracticeIntro.vue";
import { ExamDetail } from "../constants";
import examApi from "../service";

@Component({
  components: {
    ExamPractice,
    ExamPracticeIntro,
  },
})
export default class ExamDetailPage extends Vue {
  @Prop({ default: null }) private value!: string;
  examPracticeKey = Date.now();
  isStart = false;

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

  onRework() {
    this.examPracticeKey = Date.now();
    this.isStart = false;
  }

  start() {
    this.isStart = true;
  }
}
</script>

<style lang="scss" scoped></style>
