<template>
  <v-main class="main-layout">
    <AppBar />
    <router-view />
    <SpeedDial v-if="isTeacher" id="speed-dial" />
    <ArticleFormPopup />
    <UploadExcelPopup />
    <Footer />
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SpeedDial from "../SpeedDial.vue";
import AppBar from "../AppBar.vue";
import Footer from "../Footer.vue";
import ArticleFormPopup from "../../modules/articles/components/article-form-popup/ArticleFormPopup.vue";
import UploadExcelPopup from "../../modules/exams/components/UploadExcelPopup.vue";
import { USER_ROLE, AuthUser } from "../../modules/auth/constants";
import TokenSerive from "../../helpers/token";

@Component({
  components: {
    AppBar,
    Footer,
    SpeedDial,
    ArticleFormPopup,
    UploadExcelPopup,
  },
})
export default class MainLayout extends Vue {
  @Prop({ default: null }) private value!: string;

  get user(): AuthUser {
    return this.$store.state?.auth?.user || TokenSerive.getUser() || {};
  }

  get isTeacher() {
    return (this.user.roles || []).includes(USER_ROLE.TEACHER);
  }
}
</script>

<style lang="scss" scoped>
.main-layout {
  position: relative;
  .v-speed-dial {
    position: fixed;
    transform: translateY(-100%);
  }
}
</style>
