<template>
  <div>
    <v-container>
      <ExamTable @edit-exam="onEditExam" />
    </v-container>
    <ExamEditorPopup
      v-model="examEditorPopup.isShow"
      @search="fetchExamList"
      :id="examEditorPopup.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ExamTable from "../components/exam-table/ExamTable.vue";
import ExamEditorPopup from "../components/exam-detail/ExamEditorPopup.vue";

@Component({
  components: {
    ExamTable,
    ExamEditorPopup,
  },
})
export default class ExamListPage extends Vue {
  @Prop({ default: null }) private value!: string;
  examEditorPopup = {
    isShow: false,
    id: "",
  };

  get params() {
    return this.$store.state?.exams.params || {};
  }

  async created() {
    await this.fetchExamList();
  }

  async fetchExamList() {
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("exams/getExamList", this.params);
    await this.$store.dispatch("setLoading", false);
  }

  onEditExam(id: string) {
    this.examEditorPopup.isShow = true;
    this.examEditorPopup.id = id;
  }
}
</script>

<style lang="scss" scoped></style>
