import { EMAIL_REGEX, PHONE_REGEX, PASSWORD_REGEX } from "@/helpers/constants";

const Rules = {
  required: (value: string) => !!value || "Required.",
  validEmail: (value: string) => EMAIL_REGEX.test(value) || "Invalid email.",
  validPassword: (value: string) =>
    PASSWORD_REGEX.test(value) ||
    "Password must be 8-30 characters containing uppercase.",
  validPhone: (value: string) =>
    PHONE_REGEX.test(value) || "Invalid phone number.",
  nameUserLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 30) ||
    "Your name must be 3-30 characters.",
  addressLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 120) ||
    "Your name must be 3-120 characters.",

  requiredRoles: (value: string[]) => !!value.length || 'Required.',

  //Article
  aTitleLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 100) ||
    "Article title must be 3-100 characters.",
  aDescriptionLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 150) ||
    "Article description must be 3-150 characters.",
  aParagraphLength: (value: string) =>
    !value ||
    value.length < 700 ||
    "Each article paragraph must be less than 700 characters.",

  //Exam
  eTitleLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 500) ||
    "Exam title must be 3-500 characters.",
  eDescriptionLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 500) ||
    "Exam description must be 3-500 characters.",

  //Video
  vSubtitleLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 300) ||
    "Subtitle must be 3-500 characters.",
  vTitleLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 150) ||
    "Title must be 3-100 characters.",
  vDescriptionLength: (value: string) =>
    !value ||
    (value.length > 3 && value.length < 500) ||
    "Description must be 3-500 characters.",
  vCommentLength: (value: string) =>
    !value ||
    (value.length > 1 && value.length < 500) ||
    "Your comment must be 1-500 characters."
};

export default Rules;
