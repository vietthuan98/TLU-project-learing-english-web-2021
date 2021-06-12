<template>
  <v-container class="verify-email-page">
    <v-card width="400">
      <v-card-title>
        Verify your email
      </v-card-title>
      <v-card-text>
        <p>Thank you for signing up, {{ name }}</p>
        <p>
          We have sent your verification infomation to your email - {{ email }}
        </p>
        <p>Please confirm to join.</p>
        <p>Regard, TEG-English.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ml-auto" depressed color="primary" @click="goLogin">
          Back to login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class VerifyEmailPage extends Vue {
  @Prop({ default: null }) private value!: string;

  get name() {
    return this.$route.query.name;
  }

  get email() {
    return this.$route.query.email;
  }

  goLogin() {
    this.$router.push("/login");
  }
}
</script>

<style lang="scss" scoped>
.verify-email-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
