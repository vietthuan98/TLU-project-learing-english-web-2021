<template>
  <div>
    <p>
      <span class="mr-2 font-weight-medium">Exam {{ index + 1 }}:</span>
      <span>{{ question.question }}</span>
    </p>
    <v-container class="pa-0">
      <v-row no-gutters class="mt-0">
        <v-col cols="12" sm="6" v-for="(option, index) in options" :key="index">
          <ExamOption :index="index" :text="option" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ExamOption from "./ExamOption.vue";
import { QuestionDetail } from "../../constants";

@Component({
  components: {
    ExamOption,
  },
})
export default class ExamQuestion extends Vue {
  @Prop({ default: null }) private value!: string;
  @Prop({ default: 0 }) index!: number;
  @Prop({ default: () => ({}) }) question!: QuestionDetail;

  get options() {
    return this.question.options || [];
  }
}
</script>

<style lang="scss" scoped></style>
