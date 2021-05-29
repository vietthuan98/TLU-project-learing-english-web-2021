<template>
  <div class="exam-practice">
    <div class="exam" v-if="!isShowExamResult">
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
      <ExamProgress
        class="mt-10"
        :total="questions.length"
        :current="curQuestionIndex"
      />
    </div>
    <div v-else class="result">
      <ExamResult :result="result" @rework="() => $emit('rework')" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ExamQuestion from "./ExamQuestion.vue";
import ExamResult from "./ExamResult.vue";
import ExamNextButton from "./ExamNextButton.vue";
import ExamProgress from "./ExamProgress.vue";
import { ExamDetail } from "../../constants";

@Component({
  components: {
    ExamResult,
    ExamQuestion,
    ExamNextButton,
    ExamProgress
  }
})
export default class ExamPractice extends Vue {
  @Prop({ default: null }) private value!: string;
  curQuestionIndex = 0;
  result: Record<string, boolean> = {};
  isDisabledButton = true;
  isShowExamResult = false;

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
    return this.questions.length > this.curQuestionIndex;
  }

  get isLastQuestion() {
    return this.curQuestionIndex === this.questions.length - 1;
  }

  nextQuestion() {
    this.isDisabledButton = true;
    if (this.isLastQuestion) {
      this.showExamResult();
    } else {
      this.curQuestionIndex++;
    }
  }

  onHasResult(data: { index: number; isRight: boolean }) {
    const { index, isRight } = data;
    this.result = {
      ...this.result,
      [index]: isRight
    };
    this.isDisabledButton = false;
  }

  async showExamResult() {
    this.isShowExamResult = true;
    const score = Object.values(this.result).reduce(
      (acc, item) => (item ? (acc += 1) : acc),
      0
    );
    await this.$store.dispatch("setLoading", true);
    const response = await this.$store.dispatch("exams/updateExamDetail", {
      id: this.examDetail._id,
      data: {
        score
      }
    });
    await this.$store.dispatch("setLoading", false);
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
