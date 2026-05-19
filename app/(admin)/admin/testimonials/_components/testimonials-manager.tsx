"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Check, Edit2, Loader2, Plus, Star, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { testimonialSchema } from "@/lib/schema/testimonials";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
};

const RATINGS = [5, 4, 3, 2, 1] as const;

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

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        active
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground",
      )}
    >
      {active ? "Active" : "Hidden"}
    </span>
  );
}

export function TestimonialsManager({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(initialTestimonials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      content: editingTestimonial?.content || "",
      isActive: editingTestimonial?.isActive !== false,
      name: editingTestimonial?.name || "",
      rating: editingTestimonial?.rating || 5,
      role: editingTestimonial?.role || "",
    },
    // @ts-expect-error - version mismatch between react-form and zod-form-adapter
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        try {
          if (editingTestimonial) {
            const res = await updateTestimonial({
              content: value.content,
              id: editingTestimonial.id,
              isActive: value.isActive,
              name: value.name,
              rating: value.rating,
              role: value.role || undefined,
            });

            if (res?.data?.success && res.data.testimonial) {
              const updated = res.data.testimonial as Testimonial;
              setTestimonials((prev) =>
                prev.map((t) => (t.id === editingTestimonial.id ? updated : t)),
              );
              toast.success("Testimonial updated");
              setIsDialogOpen(false);
              return;
            }

            toast.error(res?.serverError || "Failed to update testimonial");
            return;
          }

          const res = await createTestimonial({
            content: value.content,
            isActive: value.isActive,
            name: value.name,
            rating: value.rating,
            role: value.role || undefined,
          });

          if (res?.data?.success && res.data.testimonial) {
            const created = res.data.testimonial as Testimonial;
            setTestimonials((prev) => [created, ...prev]);
            toast.success("Testimonial created");
            setIsDialogOpen(false);
          } else {
            toast.error(res?.serverError || "Failed to create testimonial");
          }
        } catch {
          toast.error("An error occurred. Please try again.");
        }
      });
    },
  });

  const handleOpenAddDialog = () => {
    setEditingTestimonial(null);
    form.reset({
      content: "",
      isActive: true,
      name: "",
      rating: 5,
      role: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    form.reset({
      content: testimonial.content,
      isActive: testimonial.isActive,
      name: testimonial.name,
      rating: testimonial.rating,
      role: testimonial.role || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this testimonial?")) {
      return;
    }

    setDeletingId(id);
    startTransition(async () => {
      try {
        const res = await deleteTestimonial({ id });
        if (res?.data?.success) {
          setTestimonials((prev) => prev.filter((t) => t.id !== id));
          toast.success("Testimonial deleted");
        } else {
          toast.error(res?.serverError || "Failed to delete testimonial");
        }
      } catch {
        toast.error("An error occurred while deleting testimonial");
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold">Manage reviews</h2>
        <Button onClick={handleOpenAddDialog}>
          <Plus data-icon="inline-start" />
          Add testimonial
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.length === 0 ? (
          <div className="col-span-full rounded-md border bg-background p-8 text-center text-sm text-muted-foreground">
            No testimonials found.
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex min-h-64 flex-col justify-between rounded-md border bg-background p-5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                      {testimonial.name}
                    </h3>
                    {testimonial.role && (
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                  <StatusBadge active={testimonial.isActive} />
                </div>

                <div className="flex gap-0.5">
                  {RATINGS.slice()
                    .reverse()
                    .map((rating) => (
                      <Star
                        key={rating}
                        className={cn(
                          "size-4",
                          rating <= testimonial.rating
                            ? "fill-primary text-primary"
                            : "text-muted",
                        )}
                      />
                    ))}
                </div>

                <p className="line-clamp-5 text-sm leading-6 text-muted-foreground">
                  {testimonial.content}
                </p>
              </div>

              <div className="mt-5 flex justify-end gap-2 border-t pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleOpenEditDialog(testimonial)}
                  title="Edit testimonial"
                >
                  <Edit2 />
                  <span className="sr-only">Edit testimonial</span>
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  onClick={() => handleDelete(testimonial.id)}
                  disabled={deletingId === testimonial.id}
                  title="Delete testimonial"
                >
                  {deletingId === testimonial.id ? <Loader2 /> : <Trash2 />}
                  <span className="sr-only">Delete testimonial</span>
                </Button>
              </div>
            </article>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Edit testimonial" : "Add testimonial"}
            </DialogTitle>
            <DialogDescription>
              Patient reviews shown on the public homepage.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-4">
              <form.Field
                name="name"
                validators={{ onChange: testimonialSchema.shape.name }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Patient name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Jane Doe"
                    />
                    <FieldError errors={fieldErrors(field.state.meta.errors)} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="role">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Subtitle</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Back pain patient"
                    />
                    <FieldError errors={fieldErrors(field.state.meta.errors)} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="rating">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Rating</FieldLabel>
                    <Select
                      value={String(field.state.value)}
                      onValueChange={(value) => {
                        if (value) {
                          field.handleChange(Number(value));
                        }
                      }}
                    >
                      <SelectTrigger id={field.name} className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {RATINGS.map((rating) => (
                            <SelectItem key={rating} value={String(rating)}>
                              {rating} star{rating > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldError errors={fieldErrors(field.state.meta.errors)} />
                  </Field>
                )}
              </form.Field>

              <form.Field
                name="content"
                validators={{ onChange: testimonialSchema.shape.content }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Review</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Describe their experience..."
                      className="min-h-28 resize-none"
                    />
                    <FieldError errors={fieldErrors(field.state.meta.errors)} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="isActive">
                {(field) => (
                  <Field orientation="horizontal" className="items-center">
                    <input
                      type="checkbox"
                      id={field.name}
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="size-4 rounded border-input accent-primary"
                    />
                    <FieldLabel htmlFor={field.name}>
                      Show on homepage
                    </FieldLabel>
                  </Field>
                )}
              </form.Field>
            </FieldGroup>

            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <form.Subscribe selector={(state) => [state.canSubmit]}>
                {([canSubmit]) => (
                  <Button type="submit" disabled={!canSubmit || isPending}>
                    {isPending ? (
                      <>
                        <Loader2 data-icon="inline-start" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Check data-icon="inline-start" />
                        Save testimonial
                      </>
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
