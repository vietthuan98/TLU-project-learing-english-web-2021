<template>
  <div>
    <h2 class="mb-3">{{ title }}</h2>
    <p>
      Created by <strong>{{ authorName }}</strong>
    </p>
    <div class="caption pl-4">
      <p>Email: {{ authorEmail }}</p>
      <p v-if="authorPhone">Phone: {{ authorPhone }}</p>
    </div>
    <p>
      *Note* There are all
      <strong>{{ examLength }} questions</strong>. And you have up to
      <strong>{{ minutePerQuestion }} minute</strong> to answer each question.
      You will have one score with a correct answer.
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

  get title() {
    return this.examDetail.title || "";
  }

  get author() {
    return this.examDetail?.author;
  }

  get authorName() {
    return this.author?.name || "";
  }

  get authorEmail() {
    return this.author?.email || "";
  }

  get authorPhone() {
    return this.author?.phone || "";
  }

  get examLength() {
    return this.examDetail?.questions?.length || 0;
  }
}
</script>

<style lang="scss" scoped></style>
