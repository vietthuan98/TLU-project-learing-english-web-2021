<template>
  <div>
    <div class="d-flex">
      <ExamTimer
        class="ml-auto"
        v-model="startTime"
        :end="endTime"
        :stop="stopTime"
        @on-time-out="onTimeOut"
        :hours="false"
      />
    </div>
    <p>
      <span class="mr-2 font-weight-medium">Exam {{ index + 1 }}:</span>
      <span>{{ question.question }}</span>
    </p>
    <v-container class="pa-0">
      <v-row no-gutters class="mt-0">
        <v-col cols="12" sm="6" v-for="(option, index) in options" :key="index">
          <ExamOption
            :index="index"
            :text="option"
            :wrong="isWrong(index)"
            :right="isRight(index)"
            @click.native="onSelectOption(index)"
          />
        </v-col>
      </v-row>
      <v-row class="mt-10 pa-4" v-if="question.explanation && isShowResult">
        <p>{{ question.explanation }}</p>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ExamOption from "./ExamOption.vue";
import ExamTimer from "./ExamTimer.vue";
import { QuestionDetail } from "../../constants";
import moment from "moment";

@Component({
  components: {
    ExamOption,
    ExamTimer,
  },
})
export default class ExamQuestion extends Vue {
  @Prop({ default: 0 }) index!: number;
  @Prop({ default: () => ({}) }) question!: QuestionDetail;
  selected: number[] = [];
  isShowResult = false;
  stopTime = false;
  startTime = moment();
  endTime = moment(this.startTime).add(1, "minutes");

  get options() {
    return this.question.options || [];
  }

  get answer() {
    return this.question.answer;
  }

  onSelectOption(index: number) {
    if (this.isShowResult) return;
    this.selected.push(index);
    const isRight = index === this.answer;
    if (isRight) this.isShowResult = true;
    else if (this.selected.length === this.options.length - 1)
      this.isShowResult = true;
  }

  isWrong(index: number) {
    return this.answer !== index && this.selected.includes(index);
  }

  isRight(index: number) {
    return this.answer === index && this.isShowResult;
  }

  onTimeOut() {
    this.isShowResult = true;
    console.log("onTimeOut");
  }

  @Watch("isShowResult")
  onShowResult(value: boolean) {
    if (value) {
      this.$emit("result", { index: this.index, isRight: true });
      this.stopTime = true;
    }
  }
}
</script>

<style lang="scss" scoped></style>
