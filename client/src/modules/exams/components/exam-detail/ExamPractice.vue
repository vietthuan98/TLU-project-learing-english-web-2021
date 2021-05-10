<template>
  <div>
    <ExamQuestion :question="questions[0]" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ExamQuestion from "./ExamQuestion.vue";
import { ExamDetail } from "../../constants";

@Component({
  components: {
    ExamQuestion,
  },
})
export default class ExamPractice extends Vue {
  @Prop({ default: null }) private value!: string;

  get examDetail(): ExamDetail {
    return this.$store.state.exams?.examDetail || {};
  }

  get questions() {
    return this.examDetail.questions || [];
  }
}
</script>

<style lang="scss" scoped></style>
