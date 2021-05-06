import Vue from "vue";
import ErrorText from "@/commonComponents/ErrorText.vue";
import TextInput from "@/commonComponents/TextInput.vue";
import Heart from "@/commonComponents/Heart.vue";
import Comment from "@/commonComponents/Comment.vue";
import Image from "@/commonComponents/Image.vue";

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
    name: "Image",
    component: Image
  }
];

components.forEach(item => Vue.component(`Common${item.name}`, item.component));
