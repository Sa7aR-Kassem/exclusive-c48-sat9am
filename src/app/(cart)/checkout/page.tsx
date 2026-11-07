"use client";
import { createOrder } from "@/actions/order.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/toast";
import { useCart } from "@/context/CartContext";
import {
  defaultValues,
  AddressPayloadType,
  addressSchema,
} from "@/schema/address.schema";
import { RadioGroup } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const plans = [
  {
    id: "cash",
    title: "Cash",
  },
  {
    id: "card",
    title: "Card",
  },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { cartId, updateNumOfCartItems } = useCart();
  const { handleSubmit, control, getValues } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(addressSchema),
  });

  async function onSubmit(formValues: AddressPayloadType) {
    console.log("formValues", formValues, cartId);

    const res = await createOrder(cartId, formValues);
    console.log("CheckoutPage", res);

    if (res.status === "success") {
      if (getValues("paymentMethod") === "cash") {
        toast.add({
          type: "success",
          title: res.message,
        });
        router.push("/allorders");
      } else {
        open(res.session.url, "_self");
      }

      updateNumOfCartItems(0);
    } else {
      toast.add({
        type: "error",
        title: res.message,
      });
    }
  }

  return (
    <section className="p-12">
      <form className="max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/************  Address ***********/}
          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="details">Address</FieldLabel>
                <Input
                  {...field}
                  id="details"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your details"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/************  City  ***********/}
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="city">City</FieldLabel>
                <Input
                  {...field}
                  id="city"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your city"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/************  Postal Code ***********/}
          <Controller
            name="postalCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="postalCode">Postal Code</FieldLabel>
                <Input
                  {...field}
                  id="postalCode"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your postalCode"
                  autoComplete="off"
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

          {/************  Payment Method ***********/}
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field, fieldState }) => (
              <FieldSet>
                <FieldLegend>Payment Method</FieldLegend>
                <RadioGroup
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-2">
                  {plans.map((plan) => (
                    <FieldLabel
                      key={plan.id}
                      htmlFor={`form-rhf-radiogroup-${plan.id}`}>
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldTitle>{plan.title}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem
                          value={plan.id}
                          id={`form-rhf-radiogroup-${plan.id}`}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
          />
          <Button type="submit" className={"w-full"}>
            Submit
          </Button>
        </FieldGroup>
      </form>
    </section>
  );
}
