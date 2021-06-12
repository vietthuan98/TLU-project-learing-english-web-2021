<template>
  <v-app-bar dense elevate-on-scroll hide-on-scroll>
    <!-- <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template> -->
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-app-bar-title class="font-weight-bold">TEG-English</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-app-bar-title v-if="userName && isLogined" class="caption"
      >Welcome <strong>{{ userName }}</strong>
    </v-app-bar-title>
    <!-- <v-btn icon @click="goToProfilePage">
      <v-icon>mdi-account-edit</v-icon>
    </v-btn> -->
    <v-menu v-if="isLogined" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list class="bar-option">
        <v-list-item v-for="(item, index) in userBarOption" :key="index">
          <v-list-item-title @click="item.action">
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
            <span>{{ item.label }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn small class="success" v-if="!isLogined" @click="goRegisterPage">
      Register
    </v-btn>
    <v-btn small class="primary ml-4" v-if="!isLogined" @click="goLoginPage">
      Login
    </v-btn>
    <template v-slot:extension>
      <v-tabs align-with-title>
        <template v-for="tab in tabs">
          <v-tab
            :key="tab.name"
            @click="changeTab(tab.to)"
            :class="{ 'tab--active': isActiveTab(tab.segment) }"
            >{{ tab.name }}</v-tab
          >
        </template>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import SearchEngine from "./SearchEngine.vue";
import TokenSerive from "../helpers/token";
import { logout } from "../plugins/axios";

interface Tab {
  id: number;
  name: string;
  to: string;
  segment: string;
}

@Component({
  components: {
    SearchEngine,
  },
})
export default class AppBar extends Vue {
  isShowSeachInput = false;
  tabs: Tab[] = [
    { id: 0, name: "Home", to: "/home", segment: "home" },
    { id: 1, name: "Articles", to: "/articles", segment: "articles" },
    { id: 2, name: "Exams", to: "/exams", segment: "exams" },
    { id: 3, name: "Videos", to: "/videos", segment: "videos" },
  ];

  user = TokenSerive.getUser();

  setUserData() {
    this.user = TokenSerive.getUser();
  }

  get isLogined() {
    return !!this.user._id;
  }

  created() {
    this.setUserData();
  }

  get userName() {
    return this.user?.name;
  }

  get userBarOption() {
    return [
      {
        label: "Profile",
        icon: "mdi-account-edit",
        color: "primary",
        action: this.goToProfilePage,
      },
      {
        label: "Logout",
        color: "red",
        icon: "mdi-logout-variant",
        action: this.logoutUser,
      },
    ];
  }

  goToProfilePage() {
    this.$router.push("/profile");
  }

  logoutUser() {
    logout();
    this.setUserData();
    this.$router.push("/home");
  }

  goLoginPage() {
    this.$router.push("/login");
  }

  goRegisterPage() {
    this.$router.push("/register");
  }

  // v-tab--active
  get currentPathName(): string {
    return this.$route.fullPath;
  }

  changeTab(to: string) {
    this.$router.push(to).catch((err) => {
      //
    });
  }

  isActiveTab(segment: string) {
    return this.currentPathName.includes(segment);
  }
}
</script>

<style lang="scss" scoped>
header {
  z-index: 100;
}
::v-deep .v-app-bar-title__content {
  width: auto !important;
}
.v-app-bar {
  position: sticky;
  top: 0;
}

::v-deep .v-tabs-slider {
  display: none !important;
}

::v-deep .v-tab--active {
  color: #0000008a !important;
}

::v-deep .tab--active {
  color: #1976d2 !important;
  border-bottom: medium solid #1976d2;
}

::v-deep .bar-option {
  .v-list-item {
    cursor: pointer;
    height: 40px;
    min-height: 40px;
    &:hover {
      background: #c4f7ee;
    }
  }
  .v-list-item__title {
    display: flex;
    align-items: center;
    .v-icon {
      margin-right: 0.5rem;
    }
  }
}
</style>
