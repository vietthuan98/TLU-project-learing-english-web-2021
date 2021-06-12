<template>
  <v-container>
    <v-card class="mx-auto my-5" width="550">
      <common-error-text
        class="mx-3 pa-1"
        v-if="message"
        :messageList="[message]"
      />
      <v-card-title>
        Profile
        <v-spacer></v-spacer>
        <v-icon v-if="!isEdit" @click="editProfile"
          >mdi-clipboard-edit-outline</v-icon
        >
        <v-icon v-else @click="editProfile">
          mdi-cancel
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="3" class="font-weight-bold">Email: </v-col>
            <v-col cols="9">
              <div class="text">{{ email }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="font-weight-bold">Name: </v-col>
            <v-col cols="9">
              <div v-if="!isEdit" class="text">{{ name }}</div>
              <v-text-field
                v-else
                label="Name"
                v-model="userName"
                :rules="[Rules.required, Rules.nameUserLength]"
                persistent-hint
                outlined
                class="required"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="font-weight-bold">Roles: </v-col>
            <v-col cols="9">
              <div class="text" v-if="!isEdit">{{ displayRoles }}</div>
              <template v-else>
                <div class="role-label">Role*</div>
                <div class="d-flex">
                  <template v-for="(role, index) in roleOptions">
                    <v-checkbox
                      :key="index"
                      :class="!index && 'mr-4'"
                      v-model="userRoles"
                      :rules="[Rules.requiredRoles]"
                      :label="role.label"
                      :value="role.value"
                    ></v-checkbox>
                  </template>
                </div>
              </template>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="font-weight-bold">Phone: </v-col>
            <v-col cols="9">
              <div class="text" v-if="!isEdit">{{ phone }}</div>
              <v-text-field
                v-else
                label="Phone"
                v-model="userPhone"
                :rules="[Rules.required, Rules.validPhone]"
                persistent-hint
                outlined
                class="required"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="font-weight-bold">Address: </v-col>
            <v-col cols="9">
              <div class="text" v-if="!isEdit">{{ address }}</div>
              <v-text-field
                v-else
                label="Address"
                v-model="userAddress"
                :rules="[Rules.addressLength]"
                persistent-hint
                outlined
                class="required"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col cols="3" class="font-weight-bold">Password: </v-col>
          <v-col cols="9">
            <div class="text" v-if="!isEdit">******************</div>
            <div v-else class="password-form">
              <v-text-field
                v-model="userPassword"
                label="Password"
                :type="!showPassword ? 'Password' : 'text'"
                :rules="[Rules.validPassword]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                persistent-hint
                outlined
              />
              <v-text-field
                v-model="newUserPassword"
                label="New password"
                :type="!showNewPassword ? 'Password' : 'text'"
                :rules="[Rules.validPassword]"
                :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showNewPassword = !showNewPassword"
                persistent-hint
                outlined
              />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="isEdit">
        <v-btn class="primary ml-auto" @click="save">
          <v-icon>> mdi-content-save-settings </v-icon>
          SAVE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import TokenSerive from "../../../helpers/token";
import Rules from "../../../helpers/rules";
import { AuthUser, USER_ROLE, AuthMutations } from "../constants";
import authApi from "../service";
import swal from "sweetalert2";

@Component({})
export default class ProfilePage extends Vue {
  @Prop({ default: null }) private value!: string;
  Rules = Rules;
  message = "";
  isEdit = false;
  showPassword = false;
  showNewPassword = false;

  userAddress: string | null = null;
  userPassword: string | null = null;
  newUserPassword: string | null = null;
  userName: string | null = null;
  userPhone: string | null = null;
  userRoles: string[] | null = [];

  user = TokenSerive.getUser() || {};

  get name() {
    return this.user.name || "";
  }

  get email() {
    return this.user.email || "";
  }

  get phone() {
    return this.user.phone || "";
  }

  get address() {
    return this.user.address || "";
  }

  get roles() {
    return (this.user.roles || []) as string[];
  }

  get displayRoles() {
    return this.roles
      .map((item: string) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(", ");
  }

  get roleOptions() {
    return [
      { label: "Teacher", value: USER_ROLE.TEACHER },
      { label: "Student", value: USER_ROLE.STUDENT },
    ];
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  toggleEditProfile() {
    this.isEdit = !this.isEdit;
  }

  editProfile() {
    this.toggleEditProfile();
    this.message = "";
    this.newUserPassword = null;
    this.userPassword = null;
    this.userName = this.name || null;
    this.userPhone = this.phone || null;
    this.userAddress = this.address || null;
    this.userRoles = this.roles || null;
  }

  async save() {
    this.message = "";
    const isValid = this.form.validate();
    if (!isValid) return;
    const params = {
      name: this.userName || null,
      phone: this.userPhone || null,
      password: this.userPassword || null,
      address: this.userAddress || null,
      newPassword: this.newUserPassword || null,
      roles: this.userRoles || null,
    };
    await this.$store.dispatch("setLoading", true);
    const response = await authApi.updateProfile(params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      this.isEdit = false;
      const { name, phone, address, roles } = response.data as any;
      const newUser = {
        ...this.user,
        name,
        phone,
        address,
        roles,
      } as AuthUser;
      TokenSerive.setUser(newUser);
      this.$store.commit(`auth/${AuthMutations.SET_USER}`, newUser);
      await swal.fire("", "Your profile has been uploaded", "success");
      this.user = TokenSerive.getUser() || {};
    } else {
      const message = response?.message || "Somethings wrong.";
      await swal.fire("", message, "error");
    }
  }
}
</script>

<style lang="scss" scoped></style>
