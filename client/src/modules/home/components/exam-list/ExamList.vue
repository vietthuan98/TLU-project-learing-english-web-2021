<template>
  <v-card v-if="examList.length" class="exam-list mx-auto" max-width="100%">
    <v-toolbar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Exam</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list class="exam-list-content" two-line>
      <v-list-item-group active-class="pink--text">
        <template v-for="(item, index) in examList">
          <v-list-item :key="item._id" @click="getExamDetail(item._id)">
            <template v-slot:default>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.description"
                ></v-list-item-subtitle>

                <v-list-item-subtitle
                  v-text="item.author.name"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text
                  v-text="`${item.questions.length} questions`"
                ></v-list-item-action-text>
                <v-list-item-action-text
                  v-text="`${item.users.length} participants`"
                ></v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider
            v-if="index < examList.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ExamDetail } from "../../../exams/constants";
import orderby from "lodash/orderBy";

@Component({})
export default class ExamList extends Vue {
  @Prop({ default: null }) private value!: string;

  get examList(): ExamDetail[] {
    const exams = this.$store.state.home?.exam?.items || [];
    return orderby(exams, ["createdAt"]);
  }

  getExamDetail(id: string) {
    this.$router.push("/exams/" + id);
  }
}
</script>

<style lang="scss" scoped>
::v-deep.exam-list .v-list .v-list-item {
  .v-list-item__title,
  .v-list-item__subtitle {
    overflow: visible;
    white-space: normal;
  }
}

.exam-list-content {
  overflow: auto;
}
</style>
