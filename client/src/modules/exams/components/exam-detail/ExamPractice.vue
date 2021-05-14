<template>
  <div class="exam-practice">
    <ExamQuestion
      :question="currentQuestion"
      @result="onHasResult"
      :key="curQuestionIndex"
      :index="curQuestionIndex"
    />
    <ExamNextButton
      v-if="canShowExamNextButton"
      class="next-button"
      @on-click="nextQuestion"
      :disabled="isDisabledButton"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ExamQuestion from "./ExamQuestion.vue";
import ExamNextButton from "./ExamNextButton.vue";
import { ExamDetail } from "../../constants";

export interface Result {
  index: number;
  isRight: boolean;
}

@Component({
  components: {
    ExamQuestion,
    ExamNextButton,
  },
})
export default class ExamPractice extends Vue {
  @Prop({ default: null }) private value!: string;
  curQuestionIndex = 0;
  result: Result[] = [];
  isDisabledButton = true;

  get examDetail(): ExamDetail {
    return this.$store.state.exams?.examDetail || {};
  }

  get questions() {
    return this.examDetail.questions || [];
  }

  get currentQuestion() {
    return this.questions[this.curQuestionIndex];
  }

  get canShowExamNextButton() {
    return this.questions.length - 1 > this.curQuestionIndex;
  }

  nextQuestion() {
    this.isDisabledButton = true;
    this.curQuestionIndex++;
  }

  onHasResult(data: Result) {
    this.result.push(data);
    this.isDisabledButton = false;
  }
}
</script>

<style lang="scss" scoped>
.exam-practice {
  position: relative;

  .next-button {
    position: absolute;
    top: 95px;
    right: 0;
    transform: translateX(100%);
  }
}
</style>
