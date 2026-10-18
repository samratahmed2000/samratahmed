"use client";

import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { Check, Mail } from "@/components/ui/icons";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!values.message.trim()) errors.message = "Please add a short message.";
  return errors;
}

const fieldClasses =
  "w-full rounded-lg border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/80 focus:border-accent/60 focus:outline-none";

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [opened, setOpened] = useState(false);

  const update =
    (key: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [key]: value }));
      setErrors((current) => {
        if (!current[key]) return current;
        const next = { ...current };
        delete next[key];
        return next;
      });
    };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setOpened(false);
      return;
    }

    const subject =
      values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`;
    const body = `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`;
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setOpened(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-card border border-line bg-card/50 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Your name" required error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(
              fieldClasses,
              errors.name ? "border-red-400/70" : "border-line",
            )}
            placeholder="Ahmed"
          />
        </Field>

        <Field
          id="contact-email"
          label="Your email"
          required
          error={errors.email}
        >
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(
              fieldClasses,
              errors.email ? "border-red-400/70" : "border-line",
            )}
            placeholder="ahmed@mail.com"
          />
        </Field>
      </div>

      <Field id="contact-subject" label="Subject" hint="Optional">
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={update("subject")}
          className={cn(fieldClasses, "border-line")}
          placeholder="Project enquiry"
        />
      </Field>

      <Field
        id="contact-message"
        label="Message"
        required
        error={errors.message}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className={cn(
            fieldClasses,
            "resize-y",
            errors.message ? "border-red-400/70" : "border-line",
          )}
          placeholder="Tell me a little about what you need…"
        />
      </Field>

      <div className="flex flex-col gap-3">
        <button type="submit" className={buttonClasses("primary", "lg")}>
          <Mail />
          Message Me
        </button>
      </div>

      {opened ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-lg border border-accent/40 bg-accent/10 p-4 text-sm text-foreground"
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>
            Thank You for your valuable moments.
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline underline-offset-2"
            ></a>
            .
          </span>
        </p>
      ) : null}
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, hint, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-accent">
            *
          </span>
        ) : null}
        {hint ? (
          <span className="ml-2 font-normal text-muted">({hint})</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
