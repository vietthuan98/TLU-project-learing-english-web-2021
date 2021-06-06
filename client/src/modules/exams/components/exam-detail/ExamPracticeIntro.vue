<template>
  <div>
    <h2 class="mb-3">{{ examDetail.title }}</h2>
    <p>
      Created by <strong>{{ examDetail.author.name }}</strong>
    </p>
    <div class="caption pl-4">
      <p>Email: {{ examDetail.author.email }}</p>
      <p v-if="examDetail.author.phone">Phone: {{ examDetail.author.phone }}</p>
    </div>
    <p>
      *Note* There are all
      <strong>{{ examDetail.questions.length }} questions</strong>. And you have
      up to <strong>{{ minutePerQuestion }} minute</strong> to answer each
      question. You will have one score with a correct answer.
    </p>
    <p>If you are ready, click the below button to start!</p>
    <slot name="button-start"></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ExamDetail } from "../../constants";

@Component({})
export default class ExamPracticeIntro extends Vue {
  minutePerQuestion = 1;
  get examDetail(): ExamDetail {
    return this.$store.state.exams?.examDetail || {};
  }
}
</script>

<style lang="scss" scoped></style>
