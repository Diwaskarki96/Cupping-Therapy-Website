"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { cloneElement, type ReactNode, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { createAppointment } from "@/actions/booking-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function fieldErrors(errors: unknown[]) {
  return errors.map((e) => ({
    message:
      e instanceof Error
        ? e.message
        : typeof e === "object" && e !== null && "message" in e
          ? String((e as { message: unknown }).message)
          : String(e),
  }));
}

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  message: z.string().optional(),
});

export function BookAppointmentDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      preferredDate: "",
      message: "",
    },
    // @ts-expect-error - version mismatch between react-form and zod-form-adapter
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        const res = await createAppointment(value);
        if (res?.data?.success) {
          toast.success("Appointment request sent successfully!");
          setOpen(false);
          setTimeout(() => {
            form.reset();
          }, 300);
        } else {
          toast.error(
            res?.serverError || "Failed to send request. Please try again.",
          );
        }
      } catch {
        toast.error("Failed to send request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => cloneElement(children as React.ReactElement, props)}
      />
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Fill out the form below to request an appointment. Our team will get
            back to you to confirm the time.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 py-4"
        >
          <form.Field
            name="fullName"
            validators={{
              onChange: bookingSchema.shape.fullName,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Full Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="John Doe"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {fieldErrors(field.state.meta.errors as unknown[])
                        .map((e) => e.message)
                        .join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.Field
              name="email"
              validators={{
                onChange: bookingSchema.shape.email,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="john@example.com"
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {fieldErrors(field.state.meta.errors as unknown[])
                          .map((e) => e.message)
                          .join(", ")}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="phone"
              validators={{
                onChange: bookingSchema.shape.phone,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Phone</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {fieldErrors(field.state.meta.errors as unknown[])
                          .map((e) => e.message)
                          .join(", ")}
                      </p>
                    )}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field
            name="service"
            validators={{
              onChange: bookingSchema.shape.service,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Service</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => {
                    if (val) {
                      field.handleChange(val);
                    }
                  }}
                >
                  <SelectTrigger id={field.name} className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="cupping">Cupping Therapy</SelectItem>
                      <SelectItem value="acupuncture">Acupuncture</SelectItem>
                      <SelectItem value="massage">Massage Therapy</SelectItem>
                      <SelectItem value="consultation">
                        General Consultation
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {fieldErrors(field.state.meta.errors as unknown[])
                        .map((e) => e.message)
                        .join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="preferredDate"
            validators={{
              onChange: bookingSchema.shape.preferredDate,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Preferred Date</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {fieldErrors(field.state.meta.errors as unknown[])
                        .map((e) => e.message)
                        .join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field name="message">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Message (Optional)</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tell us about any specific conditions or requirements..."
                  className="resize-none h-32"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {fieldErrors(field.state.meta.errors as unknown[])
                      .map((e) => e.message)
                      .join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <div className="flex justify-end pt-4 space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Book Appointment"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
