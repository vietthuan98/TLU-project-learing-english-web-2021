<template>
  <div class="login-page">
    <v-card width="500px" class="my-5">
      <common-error-text
        class="ma-3 pa-1"
        v-if="message"
        :messageList="[message]"
      />
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <div class="role-label">Role*</div>
          <div class="d-flex">
            <template v-for="(role, index) in roleOptions">
              <v-checkbox
                :key="index"
                :class="!index && 'mr-4'"
                v-model="roles"
                :rules="[Rules.requiredRoles]"
                :label="role.label"
                :value="role.value"
              ></v-checkbox>
            </template>
          </div>
          <p class="caption">
            A teacher can study as a student by select both two options.
          </p>
          <v-text-field
            label="Name"
            v-model="name"
            :rules="[Rules.required, Rules.nameUserLength]"
            persistent-hint
            outlined
            class="required"
          />
          <v-text-field
            label="Phone"
            v-model="phone"
            :rules="[Rules.required, Rules.validPhone]"
            persistent-hint
            outlined
            class="required"
          />
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[Rules.required, Rules.validEmail]"
            persistent-hint
            outlined
            class="required"
          />
          <v-text-field
            v-model="password"
            label="Password"
            :type="showPassword ? 'Password' : 'text'"
            :rules="[Rules.required, Rules.validPassword]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            persistent-hint
            outlined
            class="required"
          />
        </v-form>
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
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Rules from "../../../helpers/rules";
import { RegisterBody, USER_ROLE } from "../constants";
import { errorMessage } from "../../../helpers/functions";
import authApi from "../service";

@Component({})
export default class RegisterPage extends Vue {
  @Prop({ default: null }) private value!: string;
  showPassword = false;
  password = "";
  name = "";
  phone = "";
  email = "";
  message = "";
  roles = [];

  get Rules() {
    return Rules;
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  get roleOptions() {
    return [
      { label: "Teacher", value: USER_ROLE.TEACHER },
      { label: "Student", value: USER_ROLE.STUDENT },
    ];
  }

  async signUp() {
    this.message = "";
    const isValid = this.form.validate();
    if (!isValid) return;
    const params: RegisterBody = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
      roles: this.roles,
    };
    await this.$store.dispatch("setLoading", true);
    const response = await authApi.register(params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      this.$router.push({
        path: "/register/verify-email",
        query: { name: this.name, email: this.email },
      });
    } else {
      await errorMessage(response?.message);
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.role-label {
  font-size: 1rem;
}

::v-deep .v-input--checkbox.v-input--selection-controls {
  margin-top: 0;
}
</style>
