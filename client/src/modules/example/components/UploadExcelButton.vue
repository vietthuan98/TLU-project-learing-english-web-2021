<template>
  <v-file-input
    placeholder="File input"
    dense
    show-size
    :accept="acceptFile"
    name="excel"
    @change="uploadExel"
  ></v-file-input>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import XLSX from "xlsx";
import { EXCEL_HEADERS } from "../constants";

@Component({})
export default class UploadExcelButton extends Vue {
  @Prop({ default: null }) private value!: string;
  rowMax = 100;
  acceptFile = "ods, xls";

  async uploadExel(file: any) {
    const reader = new FileReader();

    reader.onload = e => {
      const excel = XLSX.read(e?.target?.result, { type: "buffer" });
      const [sheetName] = excel.SheetNames;
      const sheet = excel.Sheets[sheetName];
      const ws = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
      const [headers, ...data] = ws;
      /**Remove the description row in the excel file */
      data.splice(0, 1);
      const checkValidHeader = this.checkValidHeader(headers);
      if (!checkValidHeader) {
        //TODO: emit err
        console.log("wrong header");
      }

      const checkValidContent = this.checkValidContent(data);
      if (!checkValidContent) {
        //TODO: emit err
        console.log("wrong content");
      }
      this.$emit("onUploadFile", {
        headers,
        data
      });
    };

    reader.readAsArrayBuffer(file);
  }

  checkValidHeader(headers: string[]) {
    const validHeaders = Object.values(EXCEL_HEADERS);
    for (let i = 0; i < validHeaders.length; i++) {
      if (headers[i] !== validHeaders[i]) return false;
    }
    return true;
  }

  checkValidContent(data: string[][]) {
    if (this.rowMax < data.length) return false;
    return true;
  }
}
</script>

<style lang="scss" scoped></style>
