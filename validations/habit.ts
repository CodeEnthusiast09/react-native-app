import * as yup from "yup";

export const habitValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),

  description: yup.string().required("Description is required"),

  streak: yup
    .number()
    .min(0, "Streaks cannot be negative")
    .transform((value) => (Number.isNaN(value) ? null : value))
    .required("Streaks is required"),

  frequency: yup.string().required("Frequency is required"),

  lastCompleted: yup
    .date()
    .test(
      "lastCompleted",
      "Last completed date cannot be in the future",
      (value) => {
        if (!value) return true;

        const lastCompleted = new Date(value);

        const today = new Date();

        return lastCompleted <= today;
      }
    )
    .optional(),
});
