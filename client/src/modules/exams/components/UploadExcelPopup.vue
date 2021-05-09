<template>
  <div>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card class="pa-5">
        <UploadExcelModal
          v-model="previewModal.isShow"
          :errors="previewModal.errors"
          :excelData="excelData"
          :title="title"
          :description="description"
          @on-submit="onSubmit"
        />
        <v-text-field
          label="Title"
          v-model="title"
          :rules="[Rules.required, Rules.eTitleLength]"
          persistent-hint
          outlined
          dense
          class="required"
        />
        <v-form ref="form">
          <v-textarea
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
          <span class="caption"
            >You must fill <strong>title field</strong> before upload your exam
            excel file.
          </span>
        </v-form>
        <v-card-actions class="d-flex">
          <DownloadTempFile class="ml-auto mr-4" />
          <v-btn class="white" @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import UploadExcelModal from "./UploadExcelModal.vue";
import DownloadTempFile from "./DownloadTempFile.vue";
import XLSX from "xlsx";
import { EXCEL_HEADERS, ExamForm } from "../constants";
import ExamMixins from "../mixins/exam.mixins";
import Rules from "../../../helpers/rules";
import examAPI from "../service";
import bus from "../../../helpers/bus";
import { BUS_EVENTS } from "../../../helpers/constants";

@Component({
  components: {
    UploadExcelModal,
    DownloadTempFile,
  },
})
export default class UploadExcelPopup extends Mixins(ExamMixins) {
  @Prop({ default: null }) private value!: string;
  rowMax = 100;
  acceptFile = "ods, xls";

  dialog = false;

  mounted() {
    bus.$on(BUS_EVENTS.OPEN_EXAM_UPLOAD_EXCEL, this.onOpen);
  }

  beforeDestroy() {
    //
  }

  onOpen() {
    this.openDialog();
  }

  get Rules() {
    return Rules;
  }

  get disabled() {
    const validTitle =
      this.title && this.title.length > 3 && this.title.length < 500;
    const validDescription =
      !this.description ||
      (this.description &&
        this.description.length > 3 &&
        this.description.length < 500);
    return !validTitle || !validDescription;
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
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

  async onSubmit() {
    const params = this.makeParams();
    await this.$store.dispatch("setLoading", true);
    const response = await examAPI.create(params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      this.showPopupMessage("Your exam has been uploaded", true);
      this.dialog = false;
    } else {
      this.showPopupMessage("Your exam uploaded fail", true);
    }
  }
}
</script>

<style lang="scss" scoped></style>
