<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-header
    hide-default-footer
    single-expand
    item-key="_id"
    no-data-text="There is no exam."
  >
    <template v-slot:header="{ props: { headers } }">
      <thead>
        <tr>
          <th v-for="(item, index) in headers" :key="index" :width="item.width">
            {{ item.text }}
          </th>
        </tr>
      </thead>
    </template>
    <template v-slot:item="{ item, expand, isExpanded, index }">
      <tr>
        <td>
          {{ index + 1 }}
        </td>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <td
              class="td-title"
              @click="getExamDetail(item._id)"
              v-bind="attrs"
              v-on="on"
            >
              {{ item.title }}
            </td>
          </template>
          <span>Click to do this exam</span>
        </v-tooltip>
        <td>{{ item.questions.length }}</td>
        <td>{{ getParticipants(item) }}</td>
        <td>{{ getComments(item) }}</td>
        <td>{{ item.score }}</td>
        <td>
          <v-icon
            @click="expand(!isExpanded)"
            class="expand"
            :class="{ isRotate: isExpanded }"
          >
            mdi-chevron-up
          </v-icon>
        </td>
      </tr>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <tr>
        <td :colspan="item.yours ? headers.length - 1 : headers.length">
          <v-card>
            <v-card-text>
              <h4>Author: {{ item.author.name }}</h4>
              <h5>
                Contact: {{ item.author.phone }}/
                {{ item.author.email }}
              </h5>
              {{ item.description }}
            </v-card-text>
          </v-card>
        </td>
        <td class="td-edit" @click="editExam(item._id)" v-if="item.yours">
          <v-icon color="blue">
            mdi-file-edit-outline
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ExamDetail } from "../../constants";

@Component({
  components: {},
})
export default class ExamTable extends Vue {
  @Prop({ default: null }) private value!: string;

  get headers() {
    return [
      { text: "Index", name: "index", width: "5%" },
      { text: "Title", name: "title", width: "50%" },
      { text: "Number of questions", name: "questions", width: "20%" },
      { text: "Participants", name: "participants", width: "5%" },
      { text: "Comments", name: "comments", width: "5%" },
      { text: "Your score", name: "score", width: "15%" },
      { name: "expand", width: "5%" },
    ];
  }

  get items(): ExamDetail[] {
    return this.$store.state?.exams.examList || [];
  }

  getComments(exam: ExamDetail) {
    return (exam?.comments || []).length;
  }

  getParticipants(exam: ExamDetail) {
    return (exam?.users || []).length;
  }

  editExam(id: string) {
    this.$emit("edit-exam", id);
  }

  getExamDetail(id: string) {
    this.$router.push("/exams/" + id);
  }
}
</script>

<style lang="scss" scoped>
table {
  td.td-title,
  .td-edit {
    cursor: pointer;
  }
}

.expand.isRotate {
  transform: rotate(180deg);
}
</style>
