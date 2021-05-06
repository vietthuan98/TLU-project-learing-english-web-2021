import Vue from "vue";
import { Component } from "vue-property-decorator";
import { EXCEL_HEADERS, ANSWERS } from "../constants";
import camelCase from "lodash/camelCase";

interface PreviewModal {
  isShow: boolean;
  errors: { message?: string }[];
}

interface CellData {
  value: string;
  error?: string;
}

interface RowData {
  [key: string]: CellData;
}


@Component({})
export default class ExampleMixins extends Vue {
  previewModal: PreviewModal = {
    isShow: false,
    errors: []
  };
  isShowPreviewModal = false;
  data: string[][] = [];
  headers: string[] = [];

  get rowDataKey() {
    return Object.keys(EXCEL_HEADERS).map(item => camelCase(item));
  }

  onUploadFile({
    headers = [],
    data = []
  }: {
    headers: string[];
    data: string[][];
  }) {
    this.data = data;
    this.headers = headers;
    console.log("data", this.data);
    console.log("header", this.headers);
    this.parseData(data);
  }

  parseData(data: string[][]) {
    if (!data.length)
      this.showPreviewModel({
        isShow: true,
        errors: [{ message: "Excel data is empty" }]
      });

    const tableData: RowData[] = [];
    data.forEach(row => {
      const rowData = this.makeRowData(row);
      tableData.push(rowData);
    })
    console.log('tableData', tableData);
  }

  showPreviewModel({
    isShow = false,
    errors = []
  }: {
    isShow: boolean;
    errors: { message?: string }[];
  }) {
    this.previewModal.isShow = isShow;
    this.previewModal.errors = errors;
  }

  makeRowData(data: string[]): RowData {
    console.log('data', data);
    console.log('rowDataKey', this.rowDataKey);
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
        if (value && (value as string).length < 3 || (value as string).length > 500) return 'Explanation must be 3 - 500 characters.';
        break;
      default:
    }
  }

}
