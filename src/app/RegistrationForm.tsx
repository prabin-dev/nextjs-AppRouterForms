"use client";
import { registrationSchema } from "./registrationSchema";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export type ourRegistrationSchema = z.infer<typeof registrationSchema>;

export const RegistrationForm = ({
  onDataAction,
  onFormAction,
}: {
  onDataAction: (data: ourRegistrationSchema) => Promise<{
    message: string;
    user?: ourRegistrationSchema;
    issues?: string[];
  }>;
  onFormAction: (
    prevData: {
      message: string;
      user?: ourRegistrationSchema;
      issues?: string[];
    },
    formData: FormData
  ) => Promise<{
    message: string;
    user?: ourRegistrationSchema;
    issues?: string[];
  }>;
}) => {
  // use useFormState
  const [state, formAction] = useFormState(onFormAction, {
    message: "",
  });
  const form = useForm<ourRegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
    },
  });

  //1. IMPLEMENT A ROUTE HANDLER FOR JSON POST REQUEST

  //   const onSubmit = async (data: ourRegistrationSchema) => {
  //     fetch("/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => console.log(data));
  //   };

  //2.  CREATING A API ROUTE FOR FORM DATA

  //   const onSubmit = async (data: ourRegistrationSchema) => {
  //     const formData = new FormData();
  //     formData.append("first", data.first);
  //     formData.append("last", data.last);
  //     formData.append("email", data.email);

  //     fetch("/api/registerForm", {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => console.log(data));
  //   };

  //3. CREATING A SERVER ACTION FOR FORM DATA
  //   const onSubmit = async (data: ourRegistrationSchema) => {
  //     console.log(await onDataAction(data));
  //     onDataAction(data);
  //   };
  //4. BEST: CREATING A SERVER ACTION FOR handling FORM DATA
  const onSubmit = async (data: ourRegistrationSchema) => {
    // const formData = new FormData();
    // formData.append("first", data.first);
    // formData.append("last", data.last);
    // formData.append("email", data.email);
    // console.log(await onFormAction(formData));
    // onFormAction(formData);
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <div>{state?.message}</div>
      <form
        ref={formRef}
        action={formAction}
        className="space-y-8"
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your fist name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
