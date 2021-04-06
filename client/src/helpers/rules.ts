import { EMAIL_REGEX, PHONE_REGEX, PASSWORD_REGEX } from '@/helpers/constants';

const Rules = {
    required: (value: string) => !!value || "Required.",
    validEmail: (value: string) => EMAIL_REGEX.test(value) || "Invalid email.",
    validPassword: (value: string) => PASSWORD_REGEX.test(value) || "Password must be 8-30 characters containing uppercase.",
    validPhone: (value: string) => PHONE_REGEX.test(value) || "Invalid phone number.",
    nameUserLength: (value: string) => value.length > 3 && value.length < 30 || "Your name must be 3-30 characters.",
}

export default Rules;