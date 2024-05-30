import { RegistrationForm, ourRegistrationSchema } from "./RegistrationForm";
import { registrationSchema } from "./registrationSchema";
import { z } from "zod";

const Home = () => {
  /** Using server action for form data */
  const onDataAction = async (data: z.infer<typeof registrationSchema>) => {
    "use server";
    console.log(data);
    const parsed = registrationSchema.safeParse(data);
    if (parsed.success) {
      return {
        message: "User registered successfully",
        user: parsed.data,
      };
    } else {
      return {
        message: "User registration failed",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };
  /** BEST: Using server action for handling form data */
  const onFormAction = async (
    prevData: {
      message: string;
      user?: ourRegistrationSchema;
      issues?: string[];
    },
    formData: FormData
  ) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = registrationSchema.safeParse(data);
    if (parsed.success) {
      return {
        message: "User registered successfully",
        user: parsed.data,
      };
    } else {
      return {
        message: "User registration failed",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };
  return (
    <div className="mx-auto max-w-xl p-4">
      {/** Using server action for form data */}
      <RegistrationForm
        onDataAction={onDataAction}
        onFormAction={onFormAction}
      />
    </div>
  );
};

export default Home;
