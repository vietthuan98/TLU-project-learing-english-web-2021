import { EMAIL_REGEX, PHONE_REGEX, PASSWORD_REGEX } from '@/helpers/constants';

const Rules = {
    required: (value: string) => !!value || "Required.",
    validEmail: (value: string) => EMAIL_REGEX.test(value) || "Invalid email.",
    validPassword: (value: string) => PASSWORD_REGEX.test(value) || "Password must be 8-30 characters containing uppercase.",
    validPhone: (value: string) => PHONE_REGEX.test(value) || "Invalid phone number.",
    nameUserLength: (value: string) => value.length > 3 && value.length < 30 || "Your name must be 3-30 characters.",

    //Article
    aTitleLength: (value: string) => value.length > 3 && value.length < 100 || "Article title must be 3-100 characters.",
    aDescriptionLength: (value: string) => value.length > 3 && value.length < 150 || "Article description must be 3-150 characters.",
    aParagraphLength: (value: string) => value.length < 700 || "Each article paragraph must be less than 700 characters.",
}

export default Rules;