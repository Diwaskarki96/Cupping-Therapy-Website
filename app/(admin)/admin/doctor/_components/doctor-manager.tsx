"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Check, Loader2, Save } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateDoctorProfile } from "@/actions/cms-actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { doctorProfileSchema } from "@/lib/schema/cms";

type DoctorProfile = {
  id: string;
  name: string;
  bio: string;
  description: string;
  experienceYears: number;
  imageUrl: string;
  features: string[];
};

function fieldErrors(errors: unknown[]) {
  return errors.map((error) => ({
    message:
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in error
          ? String((error as { message: unknown }).message)
          : String(error),
  }));
}

export function DoctorProfileManager({
  initialDoctor,
}: {
  initialDoctor: DoctorProfile | null;
}) {
  const [doctor, setDoctor] = useState<DoctorProfile | null>(initialDoctor);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      name: doctor?.name || "",
      bio: doctor?.bio || "",
      description: doctor?.description || "",
      experienceYears: doctor?.experienceYears || 0,
      imageUrl: doctor?.imageUrl || "",
      features: doctor?.features.join(", ") || "",
    },
    // @ts-expect-error - version mismatch
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        try {
          const featuresArray = value.features
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f !== "");

          const res = await updateDoctorProfile({
            ...value,
            features: featuresArray,
          });

          if (res?.data?.success && res.data.doctor) {
            setDoctor(res.data.doctor as DoctorProfile);
            toast.success("Doctor profile updated");
          } else {
            toast.error(res?.serverError || "Failed to update profile");
          }
        } catch {
          toast.error("An error occurred. Please try again.");
        }
      });
    },
  });

  return (
    <div className="max-w-4xl rounded-md border bg-background p-6 shadow-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field
              name="name"
              validators={{ onChange: doctorProfileSchema.shape.name }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Doctor Name</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g., Dr. John Doe"
                  />
                  <FieldError errors={fieldErrors(field.state.meta.errors)} />
                </Field>
              )}
            </form.Field>

            <form.Field
              name="experienceYears"
              validators={{
                onChange: doctorProfileSchema.shape.experienceYears,
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Years of Experience
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  <FieldError errors={fieldErrors(field.state.meta.errors)} />
                </Field>
              )}
            </form.Field>
          </div>

          <form.Field
            name="imageUrl"
            validators={{ onChange: doctorProfileSchema.shape.imageUrl }}
          >
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Profile Image URL</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="/images/doctor.png"
                />
                <FieldError errors={fieldErrors(field.state.meta.errors)} />
              </Field>
            )}
          </form.Field>

          <form.Field
            name="bio"
            validators={{ onChange: doctorProfileSchema.shape.bio }}
          >
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Short Bio (Meet Our Expert)
                </FieldLabel>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Professional background and approach..."
                  className="min-h-24 resize-none"
                />
                <FieldError errors={fieldErrors(field.state.meta.errors)} />
              </Field>
            )}
          </form.Field>

          <form.Field
            name="description"
            validators={{ onChange: doctorProfileSchema.shape.description }}
          >
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Detailed Description
                </FieldLabel>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Clinic philosophy and commitment..."
                  className="min-h-32 resize-none"
                />
                <FieldError errors={fieldErrors(field.state.meta.errors)} />
              </Field>
            )}
          </form.Field>

          <form.Field name="features">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Key Features (Comma-separated)
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Licensed Professional, LGBTQ+ Friendly, Evidence Based"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Separate each feature with a comma.
                </p>
                <FieldError errors={fieldErrors(field.state.meta.errors)} />
              </Field>
            )}
          </form.Field>

          <div className="flex justify-end pt-4 border-t">
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isPending}
                  className="w-full sm:w-auto"
                >
                  {isPending ? (
                    <>
                      <Loader2 data-icon="inline-start" />
                      Saving Changes
                    </>
                  ) : (
                    <>
                      <Save data-icon="inline-start" />
                      Save Profile
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
