<template>
  <div>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card class="pa-5">
        <UploadExcelModal
          v-model="previewModal.isShow"
          :errors="previewModal.errors"
          :excelData="excelData"
          @on-submit="onSubmit"
        />
        <v-text-field
          label="Title"
          v-model="title"
          :rules="[Rules.required, Rules.eTitleLength]"
          persistent-hint
          outlined
          dense
        />
        <v-text-field
          label="Description"
          v-model="description"
          :rules="[Rules.eDescriptionLength]"
          persistent-hint
          outlined
          dense
        />
        <v-file-input
          :disabled="disabled"
          placeholder="File input"
          dense
          show-size
          :accept="acceptFile"
          name="excel"
          @change="uploadExel"
        ></v-file-input>
        <v-card-actions class="d-flex">
          <v-btn class="white ml-auto" @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="white" @click="openDialog"
      ><v-icon class="mr-2">mdi-file-upload</v-icon> Upload your example</v-btn
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import UploadExcelModal from "./UploadExcelModal.vue";
import XLSX from "xlsx";
import { EXCEL_HEADERS } from "../constants";
import ExampleMixins from "../mixins/example.mixins";
import Rules from "../../../helpers/rules";

@Component({
  components: {
    UploadExcelModal,
  },
})
export default class UploadExcelButton extends Mixins(ExampleMixins) {
  @Prop({ default: null }) private value!: string;
  rowMax = 100;
  acceptFile = "ods, xls";

  dialog = false;

  get Rules() {
    return Rules;
  }

  get disabled() {
    return !this.title;
  }

  async uploadExel(file: any) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const excel = XLSX.read(e?.target?.result, { type: "buffer" });
      const [sheetName] = excel.SheetNames;
      const sheet = excel.Sheets[sheetName];
      const ws = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
      const [headers, ...data] = ws;
      /**Remove the description row in the excel file */
      data.splice(0, 1);

      const errors: string[] = [];
      if (!this.checkValidHeader(headers))
        errors.push(
          "The header of the file is invalid. Modify to the same header as when you downloaded the file."
        );
      if (!this.checkValidContent(data))
        errors.push("The content of the file is invalid");
      if (errors.length) {
        this.showPreviewModel({ isShow: true, errors });
        return;
      }

      this.onUploadFile({
        headers,
        data,
      });
    };

    if (file) reader.readAsArrayBuffer(file);
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
