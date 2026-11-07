"use client";
import { registerHandler } from "@/actions/register.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  defaultValues,
  LoginPayloadType,
  loginSchema,
} from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(formValues: LoginPayloadType) {
    console.log("formValues", formValues);
    // call api

    const resp = await signIn("credentials", {
      ...formValues,
      redirect: false,
      callbackUrl: "/",
    });
    console.log("login page ", resp);

    if (resp?.ok) {
      router.push("/");
      toast.add({
        type: "success",
        title: "Login Successfully",
      });
    } else {
      toast.add({
        type: "error",
        title: "Invalid Email or Password",
      });
    }
  }

  return (
    <section className="p-12">
      <form className="max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/************  Email ***********/}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/************  Password ***********/}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className={"w-full"}>
            Login
          </Button>
        </FieldGroup>
      </form>
    </section>
  );
}
