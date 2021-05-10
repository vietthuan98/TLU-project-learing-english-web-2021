<template>
  <v-dialog v-model="dialog" persistent width="1200">
    <v-card>
      <v-card-title>
        Preview your exam
      </v-card-title>
      <v-card-subtitle>
        <h3>{{ title }}</h3>
        <h5>{{ description }}</h5>
      </v-card-subtitle>
      <v-card-text v-if="errorMessageList.length">
        <common-error-text :messageList="errorMessageList" />
      </v-card-text>
      <v-card-text v-if="!errors.length">
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
              <tr v-for="(rowData, index) in excelData" :key="index">
                <td class="td-index">{{ index + 1 }}</td>
                <td
                  v-for="(item, key) in rowData"
                  :key="key"
                  :class="[`td-${key}`, { 'has-error': item.error }]"
                >
                  {{ item.value }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-btn class="white ml-auto" @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { RowData } from "../mixins/exam.mixins";
import { EXCEL_HEADERS } from "../constants";

@Component({})
export default class UploadExcelModal extends Vue {
  @Prop({ default: false }) private value!: boolean;
  @Prop({ default: () => [] }) errors!: string[];
  @Prop({ default: () => [] }) excelData!: RowData[];
  @Prop({ default: "" }) title!: string;
  @Prop({ default: "" }) description!: string;

  get dialog() {
    return this.value;
  }

  set dialog(value: boolean) {
    this.$emit("input", value);
  }

  get headers() {
    return ["Index", ...Object.values(EXCEL_HEADERS)];
  }

  get errorMessageList() {
    if (this.errors.length) return this.errors;
    return this.errorList;
  }

  get errorList() {
    return this.excelData.reduce((errorList: string[], rowData, index) => {
      for (const prop in rowData) {
        if (rowData[prop].error) {
          const error = `Line ${index + 1}: ${rowData[prop].error}`;
          return [...errorList, error];
        }
      }
      return errorList;
    }, []);
  }

  get disabled() {
    return !!this.errorList.length;
  }

  close() {
    this.dialog = false;
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

td.has-error {
  background: #dc41416e;
}
</style>
