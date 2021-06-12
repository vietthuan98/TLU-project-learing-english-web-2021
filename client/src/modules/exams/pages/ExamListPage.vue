<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <CommonTextSearch
            style="width: 80%"
            placeholder="Please enter your title you are looking for"
            v-model="params.title"
            @search="searchByTitle"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <ExamTable @edit-exam="onEditExam" />
    </v-container>
    <ExamEditorPopup
      v-model="examEditorPopup.isShow"
      @search="fetchExamList"
      :id="examEditorPopup.id"
    />
    <div class="text-center">
      <v-pagination
        v-if="totalPage > 1"
        :value="page"
        @input="onChangePage"
        :length="totalPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ExamTable from "../components/exam-table/ExamTable.vue";
import ExamEditorPopup from "../components/exam-detail/ExamEditorPopup.vue";
import { ExamParams, ExamMutations } from "../constants";

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

  get page() {
    return this.params.page as number;
  }

  get total() {
    return this.$store.state?.exams?.total as number;
  }

  get totalPage() {
    return Math.ceil(this.total / this.params.limit);
  }

  get params(): ExamParams {
    return this.$store.state?.exams.params || {};
  }

  get examList() {
    return this.$store.state?.exams.examList || [];
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

  async onChangePage(page: number) {
    this.$store.commit(`exams/${ExamMutations.SET_PARAMS}`, {
      ...this.params,
      page,
    });
    await this.fetchExamList();
  }

  async searchByTitle(title: string) {
    this.$store.commit(`exams/${ExamMutations.SET_PARAMS}`, {
      ...this.params,
      page: 1,
      title,
    });
    await this.fetchExamList();
  }
}
</script>

<style lang="scss" scoped></style>
