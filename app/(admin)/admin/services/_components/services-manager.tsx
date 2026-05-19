"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import * as Icons from "lucide-react";
import { Check, Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createService,
  deleteService,
  updateService,
} from "@/actions/cms-actions";
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
import { serviceSchema } from "@/lib/schema/cms";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
};

const CLINIC_ICONS = [
  "Stethoscope",
  "Activity",
  "Brain",
  "Heart",
  "Hand",
  "HeartPulse",
  "Thermometer",
  "Bandage",
  "Syringe",
  "Pill",
  "FlaskConical",
  "Microscope",
  "Apple",
  "Dumbbell",
  "Zap",
] as const;

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

export function ServicesManager({
  initialServices,
}: {
  initialServices: Service[];
}) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      title: editingService?.title || "",
      description: editingService?.description || "",
      iconName: editingService?.iconName || "Stethoscope",
      order: editingService?.order || 0,
      isActive: editingService?.isActive !== false,
    },
    // @ts-expect-error - version mismatch
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        try {
          if (editingService) {
            const res = await updateService({
              id: editingService.id,
              ...value,
            });

            if (res?.data?.success && res.data.service) {
              const updated = res.data.service as Service;
              setServices((prev) =>
                prev.map((s) => (s.id === editingService.id ? updated : s)),
              );
              toast.success("Service updated");
              setIsDialogOpen(false);
              return;
            }

            toast.error(res?.serverError || "Failed to update service");
            return;
          }

          const res = await createService(value);

          if (res?.data?.success && res.data.service) {
            const created = res.data.service as Service;
            setServices((prev) =>
              [...prev, created].sort((a, b) => a.order - b.order),
            );
            toast.success("Service created");
            setIsDialogOpen(false);
          } else {
            toast.error(res?.serverError || "Failed to create service");
          }
        } catch {
          toast.error("An error occurred. Please try again.");
        }
      });
    },
  });

  const handleOpenAddDialog = () => {
    setEditingService(null);
    form.reset({
      title: "",
      description: "",
      iconName: "Stethoscope",
      order: services.length + 1,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (service: Service) => {
    setEditingService(service);
    form.reset({
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      order: service.order,
      isActive: service.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this service?")) {
      return;
    }

    setDeletingId(id);
    startTransition(async () => {
      try {
        const res = await deleteService({ id });
        if (res?.data?.success) {
          setServices((prev) => prev.filter((s) => s.id !== id));
          toast.success("Service deleted");
        } else {
          toast.error(res?.serverError || "Failed to delete service");
        }
      } catch {
        toast.error("An error occurred while deleting service");
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold">All Services</h2>
        <Button onClick={handleOpenAddDialog}>
          <Plus data-icon="inline-start" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 ? (
          <div className="col-span-full rounded-md border bg-background p-8 text-center text-sm text-muted-foreground">
            No services found.
          </div>
        ) : (
          services.map((service) => {
            const Icon = (Icons as any)[service.iconName] || Icons.Stethoscope;
            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-md border bg-background p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="size-10 bg-primary/5 rounded-lg flex items-center justify-center">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <StatusBadge active={service.isActive} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground font-medium">
                    Order: {service.order}
                  </div>
                </div>

                <div className="mt-5 flex justify-end gap-2 border-t pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleOpenEditDialog(service)}
                  >
                    <Edit2 />
                    <span className="sr-only">Edit service</span>
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => handleDelete(service.id)}
                    disabled={deletingId === service.id}
                  >
                    {deletingId === service.id ? <Loader2 /> : <Trash2 />}
                    <span className="sr-only">Delete service</span>
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add Service"}
            </DialogTitle>
            <DialogDescription>
              Details about the service offered at the clinic.
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
                name="title"
                validators={{ onChange: serviceSchema.shape.title }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Service Title</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g., Cupping Therapy"
                    />
                    <FieldError errors={fieldErrors(field.state.meta.errors)} />
                  </Field>
                )}
              </form.Field>

              <div className="grid grid-cols-2 gap-4">
                <form.Field name="iconName">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Icon</FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => {
                          if (value) field.handleChange(value);
                        }}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {CLINIC_ICONS.map((icon) => {
                              const IconComp = (Icons as any)[icon];
                              return (
                                <SelectItem key={icon} value={icon}>
                                  <div className="flex items-center gap-2">
                                    <IconComp className="size-4" />
                                    <span>{icon}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FieldError
                        errors={fieldErrors(field.state.meta.errors)}
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="order">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Display Order
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                      <FieldError
                        errors={fieldErrors(field.state.meta.errors)}
                      />
                    </Field>
                  )}
                </form.Field>
              </div>

              <form.Field
                name="description"
                validators={{ onChange: serviceSchema.shape.description }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Explain what this service is about..."
                      className="min-h-24 resize-none"
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
                        Save Service
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
