<template>
  <div>
    <h2>{{ examDetail.title }}</h2>
    <p>{{ examDetail.description }}</p>
    <div>
      <v-icon size="24" color="success">mdi-check-decagram</v-icon>
      <span>: Correct answer</span>
    </div>
    <div>
      <v-icon size="24" color="error">mdi-close-box</v-icon>
      <span>: The question you answer wrong</span>
    </div>
    <v-row class="mt-3">
      <v-col
        v-for="(question, index) in questions"
        :key="index"
        cols="12"
        sm="6"
      >
        <h4>
          Exam {{ index + 1 }}: {{ question.question }}
          <span v-if="!result[index]">
            <v-icon size="20" color="error">mdi-close-box</v-icon>
          </span>
        </h4>
        <div v-for="(option, i) in question.options" :key="i">
          <span class="font-weight-bold mr-4">{{ ANSWERS[i] }}</span>
          <span>{{ option }}</span>
          <span class="ml-1" v-if="question.answer === i">
            <v-icon size="18" color="success">mdi-check-decagram</v-icon>
          </span>
        </div>
        <p v-if="question.explanation">
          {{ question.explanation }}
        </p>
      </v-col>
    </v-row>
    <div class="font-weight-medium">
      Your score: {{ examDetail.score || 0 }}/{{ questions.length }}
    </div>
    <div class="d-flex pr-10">
      <v-btn class="rework ml-auto" @click="rework">
        Rework, do it again
      </v-btn>
      <v-btn class="primary ml-4" @click="back">
        Back to exam list
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ExamDetail, ANSWERS } from "../../constants";

@Component({})
export default class ExamResult extends Vue {
  @Prop({ default: () => ({}) }) result!: Record<string, boolean>;

  get examDetail(): ExamDetail {
    return this.$store.state.exams?.examDetail || {};
  }

  get questions() {
    return this.examDetail.questions || [];
  }

  get ANSWERS() {
    return ANSWERS;
  }

  rework() {
    this.$emit("rework");
  }

  back() {
    this.$router.push("/exams");
  }
}
</script>

<style lang="scss" scoped>
.rework {
  border: thin solid #1976d2;
  color: #1976d2;
}
</style>
