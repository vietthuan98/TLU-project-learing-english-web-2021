import Vue from "vue";
import ErrorText from "@/commonComponents/ErrorText.vue";
import TextInput from "@/commonComponents/TextInput.vue";
import Heart from "@/commonComponents/Heart.vue";
import Comment from "@/commonComponents/Comment.vue";
import VImage from "@/commonComponents/VImage.vue";
import VBreadCrumbs from "@/commonComponents/VBreadCrumbs.vue";
import TextSearch from "@/commonComponents/TextSearch.vue";

const components = [
  {
    name: "ErrorText",
    component: ErrorText
  },
  {
    name: "TextInput",
    component: TextInput
  },
  {
    name: "Heart",
    component: Heart
  },
  {
    name: "Comment",
    component: Comment
  },
  {
    name: "VImage",
    component: VImage
  },
  {
    name: "VBreadCrumbs",
    component: VBreadCrumbs
  },
  {
    name: "TextSearch",
    component: TextSearch
  }
];

components.forEach(item => Vue.component(`Common${item.name}`, item.component));
