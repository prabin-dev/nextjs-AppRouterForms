import { z } from "zod";
import { validateZipCode } from "./validateZipCode";

export const registrationSchema = z.object({
  first: z.string().trim().min(1, { message: "First name is required" }),
  last: z.string().trim().min(1, { message: "Last name is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  zipCode: z.string().trim().refine(validateZipCode, {
    message: "Invalid zipcode",
  }),
});
