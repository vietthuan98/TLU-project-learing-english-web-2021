import Vue from "vue";
import { Component } from "vue-property-decorator";
import { EXCEL_HEADERS, ANSWERS, ExamForm } from "../constants";
import camelCase from "lodash/camelCase";
import { validateCellData } from '../constants/utils';

interface PreviewModal {
  isShow: boolean;
  errors: string[];
}

interface CellData {
  value: string;
  error?: string;
}

export interface RowData {
  [key: string]: CellData;
}


@Component({})
export default class ExampleMixins extends Vue {
  dialog = false;
  previewModal: PreviewModal = {
    isShow: false,
    errors: []
  };
  isShowPreviewModal = false;
  excelData: RowData[] = [];
  headers: string[] = [];

  title = '';
  description = '';


  get rowDataKey() {
    return Object.keys(EXCEL_HEADERS).map(item => camelCase(item));
  }

  openDialog() {
    this.dialog = true;
  }

  close() {
    this.dialog = false;
    this.resetDialog();
  }

  resetDialog() {
    this.title = '';
    this.description = '';
    this.previewModal = {
      isShow: false,
      errors: []
    };
    this.isShowPreviewModal = false;
    this.excelData = [];
    this.headers = [];

  }

  onUploadFile({
    headers = [],
    data = []
  }: {
    headers: string[];
    data: string[][];
  }) {
    this.headers = headers;
    this.excelData = this.parseData(data);
    this.showPreviewModel({ isShow: true })
  }

  parseData(data: string[][]) {
    if (!data.length)
      this.showPreviewModel({
        isShow: true,
        errors: ["Excel data is empty"]
      });

    const tableData: RowData[] = [];
    data.forEach(row => {
      const rowData = this.makeRowData(row);
      tableData.push(rowData);
    })
    return tableData;
  }

  makeRowData(data: string[]): RowData {
    const rowData: RowData = {};
    this.rowDataKey.forEach((key, index) => {
      rowData[key] = {
        value: data[index],
        error: validateCellData({ key, value: data[index] })
      }
    })
    return rowData;
  }

  makeParams() {
    const params: ExamForm = {
      title: this.title,
      description: this.description,
      questions: this.excelData.map(item => ({
        question: item[camelCase(EXCEL_HEADERS.QUESTION)].value,
        options: [
          item[camelCase(EXCEL_HEADERS.OPTION_1)].value,
          item[camelCase(EXCEL_HEADERS.OPTION_2)].value,
          item[camelCase(EXCEL_HEADERS.OPTION_3)].value,
          item[camelCase(EXCEL_HEADERS.OPTION_4)].value,
        ],
        answer: ANSWERS.findIndex(answer => item[camelCase(EXCEL_HEADERS.ANSWER)].value === answer),
        explanation: item[camelCase(EXCEL_HEADERS.EXPLANATION)].value
      })),
    }
    return params;
  }

  showPreviewModel({
    isShow = false,
    errors = []
  }: {
    isShow: boolean;
    errors?: string[];
  }) {
    this.previewModal.isShow = isShow;
    this.previewModal.errors = errors;
  }
}
