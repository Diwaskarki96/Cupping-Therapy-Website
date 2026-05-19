"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { authSchema } from "@/lib/schema/auth";

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    // @ts-expect-error - version mismatch
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      setServerError(null);
      setIsPending(true);
      try {
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });
        if (error) {
          setServerError(error.message ?? "Invalid email or password");
          return;
        }
        router.push("/admin");
        router.refresh();
      } catch {
        setServerError("An unexpected error occurred. Please try again.");
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-5">
        <form.Field
          name="email"
          validators={{ onChange: authSchema.shape.email }}
        >
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                type="email"
                placeholder="admin@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="email"
              />
              <FieldError
                errors={field.state.meta.errors.map((e) => ({
                  message: e instanceof Error ? e.message : String(e),
                }))}
              />
            </Field>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{ onChange: authSchema.shape.password }}
        >
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                id={field.name}
                type="password"
                placeholder="••••••••"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="current-password"
              />
              <FieldError
                errors={field.state.meta.errors.map((e) => ({
                  message: e instanceof Error ? e.message : String(e),
                }))}
              />
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <form.Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => (
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || isPending}
          >
            {isPending ? (
              <>
                <Loader2 data-icon="inline-start" className="animate-spin" />
                Signing in…
              </>
            ) : (
              "Login to Dashboard"
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
