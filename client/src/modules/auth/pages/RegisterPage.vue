<template>
  <div class="login-page">
    <v-card width="500px">
      <common-error-text
        class="ma-3 pa-1"
        v-if="message"
        :messageList="[message]"
      />
      <v-form ref="form">
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-text-field
            label="Name"
            v-model="name"
            :rules="[Rules.required, Rules.nameUserLength]"
            persistent-hint
            outlined
          />
          <v-text-field
            label="Phone"
            v-model="phone"
            :rules="[Rules.required, Rules.validPhone]"
            persistent-hint
            outlined
          />
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
          <span href="/login">
            You already have an account?
            <a href="/login">Click here to login.</a>
          </span>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn class="ml-auto" depressed color="primary" @click="signUp">
            Sign up
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
import { IRegisterBody } from "../constants";
import authApi from "../service";
import TokenServices from "../../../helpers/token";

@Component({})
export default class RegisterPage extends Vue {
  @Prop({ default: null }) private value!: string;
  showPassword = false;
  password = "";
  name = "";
  phone = "";
  email = "";
  message = "";

  get Rules() {
    return Rules;
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  async signUp() {
    this.message = "";
    const isValid = this.form.validate();
    if (!isValid) return;
    const params: IRegisterBody = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
    };
    await this.$store.dispatch("setLoading", true);
    const response = await authApi.register(params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      //TODO: redirect to show email
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
  }
}
</style>
