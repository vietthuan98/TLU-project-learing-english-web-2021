import camelCase from "lodash/camelCase";
import { EXCEL_HEADERS, ANSWERS } from "./index";

export function validateCellData(data: {
  key: string;
  value: string | number;
}): string | undefined {
  const { key, value } = data;
  switch (key) {
    case camelCase(EXCEL_HEADERS.QUESTION):
      if (!value) return "Question is required.";
      if ((value as string).length < 3 || (value as string).length > 500)
        return "Question must be 3 - 500 characters.";
      break;
    case camelCase(EXCEL_HEADERS.OPTION_1):
    case camelCase(EXCEL_HEADERS.OPTION_2):
    case camelCase(EXCEL_HEADERS.OPTION_3):
    case camelCase(EXCEL_HEADERS.OPTION_4):
      if (!value) return "Option is required.";
      if ((value as string).length < 3 || (value as string).length > 500)
        return "Option must be 3 - 500 characters.";
      break;
    case camelCase(EXCEL_HEADERS.ANSWER):
      if (!value) return "Answer is required.";
      if (!ANSWERS.includes((value as string).toUpperCase()))
        return "Answer must be one of A, B, C or D.";
      break;
    case camelCase(EXCEL_HEADERS.EXPLANATION):
      if (
        (value && (value as string)?.length < 3) ||
        (value as string)?.length > 500
      )
        return "Explanation must be 3 - 500 characters.";
      break;
    default:
  }
}
