<template>
  <div>
    <v-dialog
      v-if="isVisible"
      v-model="isVisible"
      scrollable
      persistent
      @keydown.esc="close"
      width="850"
    >
      <v-card>
        <v-card-title>
          {{ article._id ? "Update an article" : "Create a new article" }}
        </v-card-title>
        <v-card-text class="pt-2">
          <v-form ref="form">
            <v-text-field
              label="Title"
              v-model="article.title"
              :rules="[Rules.required, Rules.aTitleLength]"
              persistent-hint
              outlined
              dense
              class="required"
            />
            <v-file-input
              v-if="!article.image"
              placeholder="File input"
              dense
              show-size
              :accept="acceptFile"
              name="image"
              @change="uploadImage"
            ></v-file-input>
            <template v-else>
              <common-v-image
                :src="article.image"
                max-height="300"
                class="mb-4"
              />
            </template>
            <v-text-field
              label="Description"
              v-model="article.description"
              :rules="[Rules.required, Rules.aDescriptionLength]"
              persistent-hint
              outlined
              dense
              class="required"
            />
            <template v-for="(item, index) in article.paragraph">
              <div class="paragraph" :key="index">
                <v-textarea
                  :label="`Paragraph ${index + 1}`"
                  v-model="article.paragraph[index]"
                  :rules="getParagrapRules(index)"
                  persistent-hint
                  outlined
                  dense
                  :class="{ required: index === 0 }"
                />
                <div class="paragraph__actions">
                  <v-btn
                    icon
                    class="button-trash"
                    v-if="index !== 0"
                    @click="deleteParagraph(index)"
                  >
                    <v-icon>
                      mdi-trash-can-outline
                    </v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    class="button-add"
                    @click="addMoreParagraph"
                    v-if="canAddMoreParagraph"
                  >
                    <v-icon color="blue">mdi-text-box-plus-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn class="white ml-auto" @click="close">Close</v-btn>
          <v-btn class="primary" @click="submit">{{
            article._id ? "Update" : "Create"
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import bus from "../../../../helpers/bus";
import { BUS_EVENTS } from "../../../../helpers/constants";
import { ArticleDetail, ArticleForm } from "../../constants";
import Rules from "../../../../helpers/rules";
import articleAPI from "../../service";

@Component({})
export default class ArticleFormPopup extends Vue {
  isVisible = false;
  acceptFile = "image/png, image/jpeg, image/ipg";
  article: ArticleForm = {
    title: "",
    paragraph: [""],
    description: "",
    image: "",
  };

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  async uploadImage(file: string) {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    await this.$store.dispatch("setLoading", true);
    const response = await this.$store.dispatch(
      "articles/uploadImage",
      formData
    );
    await this.$store.dispatch("setLoading", false);
    if (response?.success) {
      this.article.image = response.data?.url;
      this.showPopupMessage("Your image uploaded", true);
    }
  }

  async submit() {
    const isValid = this.form.validate();
    if (!isValid) return;
    await this.$store.dispatch("setLoading", true);
    const params = { ...this.article };
    delete params._id;
    const response = !this.article._id
      ? await articleAPI.create(params)
      : await articleAPI.update(this.article._id, params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      const message = !this.article._id
        ? "our article has been created"
        : "Your article has been updated";
      this.showPopupMessage(message, true);
      await this.reloadArticleListIfNeed();
      this.close();
    } else {
      this.showPopupMessage(response.message.toString(), false);
    }
  }

  async getArticleDetail(_id: string) {
    await this.$store.dispatch("setLoading", true);
    const response = await articleAPI.detail(_id);
    await this.$store.dispatch("setLoading", false);
    if (!response.success) {
      this.showPopupMessage(response.message.toString(), false);
      this.close();
    } else {
      const data = response.data as ArticleDetail;
      this.$set(this, "article", {
        _id: data._id,
        title: data.title || "",
        paragraph: data.paragraph || [""],
        description: data.description || "",
        image: data.image || "",
      });
    }
  }

  get Rules() {
    return Rules;
  }

  mounted() {
    bus.$on(BUS_EVENTS.OPEN_ARTICLE_FORM_POPUP, this.openDialog);
  }

  beforeDestroy() {
    bus.$off(BUS_EVENTS.OPEN_ARTICLE_FORM_POPUP);
  }

  openDialog(_id: string) {
    if (_id) this.getArticleDetail(_id);
    this.isVisible = true;
  }

  close() {
    this.article = {
      title: "",
      paragraph: [""],
      description: "",
      image: "",
    };
    this.isVisible = false;
  }

  addMoreParagraph() {
    this.article?.paragraph?.push("");
  }

  deleteParagraph(index: number) {
    this.article?.paragraph?.splice(1, index);
  }

  get canAddMoreParagraph() {
    return (this.article?.paragraph || []).length < 5;
  }

  getParagrapRules(index: number) {
    const rules: Function[] = [Rules.aParagraphLength];
    if (index === 0) rules.push(Rules.required);
    return rules;
  }

  async reloadArticleListIfNeed() {
    if (this.$route.path === "/articles") {
      await this.$store.dispatch("setLoading", true);
      await this.$store.dispatch(
        "articles/getArticleList",
        this.$store.state.articles.params
      );
      await this.$store.dispatch("setLoading", false);
    }
  }
}
</script>

<style lang="scss" scoped>
.paragraph {
  position: relative;
  &__actions {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(8%, 10%);
  }
}
</style>
