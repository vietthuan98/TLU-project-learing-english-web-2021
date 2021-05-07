import Vue from "vue";
import { Component } from "vue-property-decorator";
import { EXCEL_HEADERS, ANSWERS, ExampleForm } from "../constants";
import camelCase from "lodash/camelCase";

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
    console.log('tableData', tableData);
    return tableData;
  }

  makeRowData(data: string[]): RowData {
    const rowData: RowData = {};
    this.rowDataKey.forEach((key, index) => {
      rowData[key] = {
        value: data[index],
        error: this.validateCellData({ key, value: data[index] })
      }
    })
    return rowData;
  }

  validateCellData(data: { key: string, value: string | number }) {
    const { key, value } = data;
    switch (key) {
      case camelCase(EXCEL_HEADERS.QUESTION):
        if (!value) return 'Question is required.';
        if ((value as string).length < 3 || (value as string).length > 500) return 'Question must be 3 - 500 characters.';
        break;
      case camelCase(EXCEL_HEADERS.OPTION_1) || camelCase(EXCEL_HEADERS.OPTION_2) || camelCase(EXCEL_HEADERS.OPTION_3) || camelCase(EXCEL_HEADERS.OPTION_4):
        if (!value) return 'Option is required.'
        if ((value as string).length < 3 || (value as string).length > 500) return 'Option must be 3 - 500 characters.';
        break;
      case camelCase(EXCEL_HEADERS.ANSWER):
        if (!value) return 'Answer is required.'
        if (ANSWERS.includes((value as string).toLowerCase())) return 'Answer must be one of A, B, C or D.';
        break;
      case camelCase(EXCEL_HEADERS.EXPLANATION):
        if (value && (value as string)?.length < 3 || (value as string)?.length > 500) return 'Explanation must be 3 - 500 characters.';
        break;
      default:
    }
  }

  makeParams() {
    const params: ExampleForm = {
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
