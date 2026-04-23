"use client";

import { useState, FormEvent } from "react";
import { Input, Select, Textarea } from "@/components/ui/Input";
import ServiceCheckboxes from "@/components/ui/ServiceCheckboxes";
import Button from "@/components/ui/Button";
import { createQuote, ServiceType, TimelineType } from "@/lib/firestore";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  services: ServiceType[];
  timeline: TimelineType | "";
  notes: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "[PLACEHOLDER: State]",
  zip: "",
  services: [],
  timeline: "",
  notes: "",
};

function validate(f: FormState): FormErrors {
  const e: FormErrors = {};
  if (!f.firstName.trim()) e.firstName = "First name is required.";
  if (!f.lastName.trim()) e.lastName = "Last name is required.";
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "A valid email is required.";
  if (!f.phone.trim()) e.phone = "Phone number is required.";
  if (!f.street.trim()) e.street = "Street address is required.";
  if (!f.city.trim()) e.city = "City is required.";
  if (!f.state.trim()) e.state = "State is required.";
  if (!f.zip.trim()) e.zip = "Zip code is required.";
  if (f.services.length === 0) e.services = "Select at least one service.";
  return e;
}

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function set(field: keyof FormState, value: string | ServiceType[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setSubmitError("");
    try {
      await createQuote({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: {
          street: form.street.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          zip: form.zip.trim(),
        },
        services: form.services,
        timeline: (form.timeline || "Just exploring") as TimelineType,
        notes: form.notes.trim(),
      });
      setSuccess(true);
      setForm(empty);
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-[#f0faf5] border border-[#52B788] rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-2xl font-bold text-[#2D6A4F] mb-3">Quote Request Received!</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Thanks for your interest! We&apos;ll review your request and get back to you with a
          quote by phone or email soon.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-sm text-[#2D6A4F] font-medium hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="firstName"
          label="First Name"
          required
          value={form.firstName}
          onChange={(e) => set("firstName", e.target.value)}
          error={errors.firstName}
          autoComplete="given-name"
        />
        <Input
          id="lastName"
          label="Last Name"
          required
          value={form.lastName}
          onChange={(e) => set("lastName", e.target.value)}
          error={errors.lastName}
          autoComplete="family-name"
        />
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="email"
          label="Email Address"
          type="email"
          required
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      {/* Address */}
      <Input
        id="street"
        label="Street Address"
        required
        value={form.street}
        onChange={(e) => set("street", e.target.value)}
        error={errors.street}
        autoComplete="street-address"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="col-span-2">
          <Input
            id="city"
            label="City"
            required
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            error={errors.city}
            autoComplete="address-level2"
          />
        </div>
        <Input
          id="state"
          label="State"
          required
          value={form.state}
          onChange={(e) => set("state", e.target.value)}
          error={errors.state}
          autoComplete="address-level1"
        />
        <Input
          id="zip"
          label="Zip Code"
          required
          value={form.zip}
          onChange={(e) => set("zip", e.target.value)}
          error={errors.zip}
          autoComplete="postal-code"
          inputMode="numeric"
        />
      </div>

      {/* Services */}
      <ServiceCheckboxes
        selected={form.services}
        onChange={(s) => set("services", s)}
        error={errors.services}
      />

      {/* Timeline */}
      <Select
        id="timeline"
        label="When are you looking to start?"
        value={form.timeline}
        onChange={(e) => set("timeline", e.target.value)}
      >
        <option value="">Not sure yet...</option>
        <option value="As soon as possible">As soon as possible</option>
        <option value="Within 2 weeks">Within 2 weeks</option>
        <option value="Within a month">Within a month</option>
        <option value="Just exploring">Just exploring</option>
      </Select>

      {/* Notes */}
      <Textarea
        id="notes"
        label="Additional Notes"
        placeholder="Lot size, any special considerations, questions you have, etc."
        value={form.notes}
        onChange={(e) => set("notes", e.target.value)}
      />

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {submitError}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        Submit Quote Request
      </Button>
    </form>
  );
}
