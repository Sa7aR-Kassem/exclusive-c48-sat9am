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
  RegisterPayloadType,
  registerSchema,
} from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(formValues: RegisterPayloadType) {
    // console.log("formValues", formValues);
    // call api
    const { message, status } = await registerHandler(formValues);
    // console.log("register ", data);
    if (status) {
      // setItem
      toast.add({
        type: "success",
        title: message,
      });
      router.push("/login");
    } else {
      toast.add({
        type: "error",
        title: message,
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
          {/************  Name ***********/}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  autoComplete="off"
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
          {/************  Confirm Password ***********/}
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="rePassword">Confirm Password</FieldLabel>
                <Input
                  {...field}
                  id="rePassword"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your rePassword"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/************  Phone ***********/}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your phone"
                  autoComplete="off"
                  type="tel"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" className={"w-full"}>
            Register
          </Button>
        </FieldGroup>
      </form>
    </section>
  );
}
