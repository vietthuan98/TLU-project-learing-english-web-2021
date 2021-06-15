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
    <v-row>
      <v-col>
        <div class="font-weight-medium">
          Your score: {{ examDetail.score || 0 }}/{{ questions.length }}
        </div>
      </v-col>
      <v-col>
        <div class="d-flex pr-10">
          <v-btn class="rework ml-auto" @click="rework">
            Rework, do it again
          </v-btn>
          <v-btn class="primary ml-4" @click="back">
            Back to exam list
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="comments.length">
      <v-col cols="10">
        <ExamComment
          v-for="(item, index) in comments"
          :key="index"
          :comment="item"
          @delete-comment="updateExam"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-textarea
          solo
          name="input-7-4"
          label="Leave your comment"
          v-model="comment"
          @keyup.enter="addComment"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col class="pt-0"
        ><v-btn class="primary" @click="addComment">
          Submit
        </v-btn></v-col
      >
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ExamDetail, ANSWERS } from "../../constants";
import ExamComment from "./ExamComment.vue";

@Component({
  components: {
    ExamComment,
  },
})
export default class ExamResult extends Vue {
  @Prop({ default: () => ({}) }) result!: Record<string, boolean>;
  comment = "";

  get examDetail(): ExamDetail {
    return this.$store.state.exams?.examDetail || {};
  }

  get questions() {
    return this.examDetail.questions || [];
  }

  get comments() {
    return this.examDetail.comments || [];
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

  async addComment() {
    await this.updateExam({
      comment: this.comment,
    });
    this.comment = "";
  }

  async updateExam(data: any) {
    await this.$store.dispatch("setLoading", true);
    const response = await this.$store.dispatch("exams/updateExamDetail", {
      id: this.examDetail._id,
      data,
    });
    await this.$store.dispatch("setLoading", false);
  }
}
</script>

<style lang="scss" scoped>
.rework {
  border: thin solid #1976d2;
  color: #1976d2;
}
</style>
