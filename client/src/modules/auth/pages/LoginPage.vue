<template>
  <div class="login-page">
    <v-card width="500px">
      <common-error-text class="ma-3 pa-1" v-if="message" :message="message" />
      <v-form ref="form">
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[Rules.required, Rules.validEmail]"
            persistent-hint
            outlined
          />
          <v-text-field
            v-model="password"
            label="Password"
            :type="showPassword ? 'Password' : 'text'"
            value="Grocery delivery"
            :rules="[Rules.required, Rules.validPassword]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            persistent-hint
            outlined
          />
        </v-card-text>
        <v-card-subtitle>
          <span>
            You dont have any acount?
            <a href="/register">Click here to register an account.</a>
          </span>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn class="ml-auto" depressed color="primary" @click="signIn">
            Sign in
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Rules from "../../../helpers/rules";
import { IRegisterBody, ILoginBody } from "../constants";
import authApi from "../service";
import TokenServices from "../../../helpers/token";

@Component({})
export default class LoginPage extends Vue {
  @Prop({ default: null }) private value!: string;
  showPassword = false;
  password = "";
  email = "";
  message = "";

  get Rules() {
    return Rules;
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  async signIn() {
    this.message = "";
    const isValid = this.form.validate();
    if (!isValid) return;
    const params: ILoginBody = {
      email: this.email,
      password: this.password
    };
    await this.$store.dispatch("setLoading", true);
    const response = await authApi.login(params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      TokenServices.setUser(response.data.user);
      TokenServices.setToken(response.data.token);
      this.$router.push("/");
      //
    } else {
      this.message = response?.message || "Somethings wrong.";
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  .v-card {
    transform: translateY(-20%);
  }
}
</style>
