import Vue from "vue";
import { Component } from "vue-property-decorator";
import { EXCEL_HEADERS } from "../constants";
import camelCase from "lodash/camelCase";

interface PreviewModal {
  isShow: boolean;
  errors: { message?: string }[];
}

interface CellData {
  data: string;
  error?: string;
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
}
