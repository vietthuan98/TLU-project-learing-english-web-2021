<template>
  <v-dialog v-model="dialog" persistent width="1200">
    <v-card>
      <v-card-title>
        <span>Exam editor</span>
        <span class="caption ml-auto font-italic">
          (*)You can edit these fields
        </span>
      </v-card-title>
      <v-card-subtitle class="pb-1">
        <div class="d-flex align-center">
          <span class="mr-2">Title:</span>
          <v-text-field
            v-model="title"
            solo
            dense
            flat
            hide-details
          ></v-text-field>
        </div>
      </v-card-subtitle>
      <v-card-text v-if="errors.length" class="pb-0">
        <common-error-text :messageList="errors" />
      </v-card-text>
      <v-card-text>
        <v-simple-table class="excel-table" fixed-header height="60vh">
          <template v-slot:default>
            <thead>
              <tr>
                <th v-for="(item, index) in headers" :key="index">
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :key="index">
                <td class="td-index">{{ index + 1 }}</td>
                <td
                  class="td-question"
                  :class="{ 'has-error': item.question.error }"
                >
                  <v-text-field
                    v-model="tableData[index].question.value"
                    solo
                    dense
                    flat
                    hide-details
                  ></v-text-field>
                </td>
                <td
                  v-for="(value, key, i) in item.options"
                  :key="key"
                  :class="[
                    `td-option${i + 1}`,
                    { 'has-error': item.options[key].error },
                  ]"
                >
                  <v-text-field
                    v-model="tableData[index].options[key].value"
                    solo
                    dense
                    flat
                    hide-details
                  ></v-text-field>
                </td>
                <td
                  class="td-answer"
                  :class="{ 'has-error': item.answer.error }"
                >
                  <v-text-field
                    v-model="tableData[index].answer.value"
                    solo
                    dense
                    flat
                    hide-details
                  ></v-text-field>
                </td>
                <td
                  class="td-explanation"
                  :class="{ 'has-error': item.explanation.error }"
                >
                  <v-text-field
                    v-model="tableData[index].explanation.value"
                    solo
                    dense
                    flat
                    hide-details
                  ></v-text-field>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-text>
        <div>
          <v-textarea
            label="Description"
            v-model="description"
            flat
            hide-details
          ></v-textarea>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn class="white ml-auto" @click="close">Close</v-btn>
        <v-btn class="primary" @click="update" :disabled="disabled"
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import {
  ExamDetail,
  EXCEL_HEADERS,
  ANSWERS,
  ExamForm,
  QuestionDetail,
} from "../../constants";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import { validateCellData } from "../../constants/utils";
import examAPI from "../../service";

interface CellData {
  value: string | number | string[];
  error: string | null;
}

interface RowData {
  question: CellData;
  options: Record<string, CellData>;
  answer: CellData;
  explanation: CellData;
}

@Component({})
export default class ExamEditorPopup extends Vue {
  @Prop({ default: false }) private value!: boolean;
  @Prop({ required: true }) private id!: string;

  title = "";
  description = "";
  rowData: RowData = {
    question: {
      value: "",
      error: null,
    },
    options: {
      option1: {
        value: "",
        error: null,
      },
      option2: {
        value: "",
        error: null,
      },
      option3: {
        value: "",
        error: null,
      },
      option4: {
        value: "",
        error: null,
      },
    },
    answer: {
      value: "",
      error: null,
    },
    explanation: {
      value: "",
      error: null,
    },
  };
  tableData: RowData[] = [];
  errors: string[] = [];

  get dialog() {
    return this.value;
  }

  set dialog(value: boolean) {
    this.$emit("input", value);
  }

  get disabled() {
    return false;
  }

  close() {
    this.dialog = false;
  }

  get examDetail(): ExamDetail {
    return this.$store.state?.exams.examDetail || {};
  }

  get headers() {
    return ["Index", ...Object.values(EXCEL_HEADERS)];
  }

  @Watch("dialog", { immediate: true })
  async onDialogChange(value: boolean) {
    if (value) {
      await this.$store.dispatch("setLoading", true);
      await this.$store.dispatch("exams/getExamDetail", this.id);
      await this.$store.dispatch("setLoading", false);
      this.initFormData();
    } else this.resetFormData();
  }

  initFormData() {
    this.title = this.examDetail.title;
    this.description = this.examDetail.description;
    this.examDetail.questions.forEach((question, index) => {
      const _rowData = cloneDeep(this.rowData);
      _rowData.question.value = question.question as string;
      let i = 0;
      for (const key in _rowData.options) {
        _rowData.options[key].value = question?.options[i];
        i++;
      }
      _rowData.answer.value = ANSWERS[question.answer as number] as string;
      _rowData.explanation.value = question.explanation as string;
      this.$set(this.tableData, index, _rowData);
    });
  }

  async update() {
    this.validateFormData();
    if (this.errors.length) return;
    const params = this.makePrams();
    await this.$store.dispatch("setLoading", true);
    const response = await examAPI.update(this.id, params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      this.showPopupMessage("Your exam has been updated", true);
      this.$emit("search");
      this.close();
    } else {
      this.showPopupMessage("Something's wrong. Please try again", false);
    }
  }

  makePrams() {
    const questions = this.tableData.reduce(
      (acc: QuestionDetail[], rowData) => {
        const item: QuestionDetail = {
          question: rowData.question.value as string,
          options: [
            rowData.options.option1.value as string,
            rowData.options.option2.value as string,
            rowData.options.option3.value as string,
            rowData.options.option4.value as string,
          ],
          answer: ANSWERS.findIndex(
            (item) => item === (rowData.answer.value as string).toUpperCase()
          ),
          explanation: rowData.explanation.value as string,
        };
        return [...acc, item];
      },
      []
    );
    const params: ExamForm = {
      title: this.title,
      description: this.description,
      questions,
    };
    return params;
  }

  validateFormData() {
    this.errors = [];
    this.tableData.forEach((rowData, index) => {
      for (const key in rowData) {
        if (key === "options") {
          for (const _key in rowData[key]) {
            const value = rowData[key][_key].value as string;
            const error = validateCellData({ key: _key, value }) as string;
            rowData[key][_key].error = error;
            if (error) this.errors.push(this.formatError(error, index + 1));
          }
        } else {
          const error = validateCellData({
            key,
            value: get(rowData, `${key}.value`),
          }) as string;
          (rowData as Record<string, any>)[key].error = error;
          if (error) this.errors.push(this.formatError(error, index + 1));
        }
      }
    });
  }

  formatError(error: string, index: number) {
    return `Line ${index}: ${error}`;
  }

  resetFormData() {
    this.title = "";
    this.description = "";
    this.rowData = {
      question: {
        value: "",
        error: null,
      },
      options: {
        option1: {
          value: "",
          error: null,
        },
        option2: {
          value: "",
          error: null,
        },
        option3: {
          value: "",
          error: null,
        },
        option4: {
          value: "",
          error: null,
        },
      },
      answer: {
        value: "",
        error: null,
      },
      explanation: {
        value: "",
        error: null,
      },
    };
    this.tableData = [];
    this.errors = [];
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table__wrapper {
  border: 1px solid #ddd !important;
}

::v-deep table {
  th,
  td {
    padding: 0.5rem !important;
    border: 1px solid #ddd !important;
    font-size: 14px !important;
  }

  th {
    color: black !important;
    background: #f1f1f1 !important;
  }
}

.td-question {
  width: 30%;
}

.td-option1,
.td-option2,
.td-option3,
.td-option4 {
  width: 13%;
}

.td-explanation {
  width: 13%;
}

::v-deep td.has-error {
  background: #dc41416e;
  .v-input__slot {
    background: #dc41416e !important;
  }
}

::v-deep .v-input {
  .v-input__slot {
    padding: 0 !important;
  }
  input {
    text-overflow: ellipsis;
  }
}

.v-card {
  position: relative;
  .v-card__actions {
    position: sticky;
    bottom: 0;
    background: white;
    border-top: 1px solid #ddd;
  }
}
</style>
