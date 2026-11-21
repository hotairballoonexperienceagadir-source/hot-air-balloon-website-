"use client";

import type { ReactNode } from "react";
import { CalendarDays, MapPin, Minus, Plus, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { formatPrice, tpl } from "@/lib/i18n/format";
import { useI18n } from "@/lib/i18n/context";
import type { Offer } from "@/lib/site";
import type { BookingDestination } from "@/lib/booking-store";

/**
 * Shared booking form fields used by BOTH the BookingModal and the inline
 * hero BookingBar. One single styling source: gold uppercase labels with
 * icons and h-12 white/10 rounded-xl controls on the navy panel.
 */

function FieldLabel({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {children}
    </span>
  );
}

export function BookingDateField({
  value,
  min,
  onChange,
  invalid,
}: {
  value: string;
  min?: string;
  onChange: (value: string) => void;
  invalid: boolean;
}) {
  const { dict } = useI18n();
  return (
    <label className="block">
      <FieldLabel icon={CalendarDays}>{dict.booking.dateLabel}</FieldLabel>
      <input
        type="date"
        min={min || undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={dict.booking.dateAria}
        aria-invalid={invalid || undefined}
        className={`h-12 w-full rounded-xl border bg-white/10 px-4 text-white [color-scheme:dark] outline-none transition focus:border-brand-400 ${
          invalid ? "border-red-400/70" : "border-white/15"
        }`}
      />
      {invalid && (
        <span role="alert" className="mt-1.5 block text-xs font-semibold text-red-300">
          {dict.booking.dateError}
        </span>
      )}
    </label>
  );
}

export function BookingPackageField({
  offers,
  value,
  onChange,
}: {
  offers: readonly Offer[];
  value: string;
  onChange: (id: string) => void;
}) {
  const { locale, dict } = useI18n();
  return (
    <label className="block">
      <FieldLabel icon={ShieldCheck}>{dict.booking.packageLabel}</FieldLabel>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={dict.booking.packageAria}
        className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none transition focus:border-brand-400"
      >
        {offers.map((offer) => (
          <option key={offer.id} value={offer.id} className="text-navy-900">
            {offer.name} | {formatPrice(offer.priceMad, locale)}
            {offer.minGuests ? tpl(dict.booking.minGuestsOption, { n: offer.minGuests }) : ""}
          </option>
        ))}
      </select>
    </label>
  );
}

export function BookingDestinationField({
  value,
  onChange,
}: {
  value: BookingDestination;
  onChange: (destination: BookingDestination) => void;
}) {
  const { dict } = useI18n();
  return (
    <label className="block">
      <FieldLabel icon={MapPin}>{dict.booking.destinationLabel}</FieldLabel>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as BookingDestination)}
        aria-label={dict.booking.destinationAria}
        className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none transition focus:border-brand-400"
      >
        <option value="Agadir" className="text-navy-900">
          {dict.booking.destinationAgadir}
        </option>
        <option value="Marrakech" className="text-navy-900">
          {dict.booking.destinationMarrakech}
        </option>
      </select>
    </label>
  );
}

export function BookingGuestsField({
  guests,
  onDecrease,
  onIncrease,
}: {
  guests: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  const { dict } = useI18n();
  return (
    <div>
      <FieldLabel icon={Users}>{dict.booking.guestsLabel}</FieldLabel>
      <div className="flex h-12 items-center justify-between rounded-xl border border-white/15 bg-white/10 px-2">
        <button
          type="button"
          aria-label={dict.booking.decreaseAria}
          onClick={onDecrease}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-white/15"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="text-base font-bold text-white" aria-live="polite">
          {guests}
        </span>
        <button
          type="button"
          aria-label={dict.booking.increaseAria}
          onClick={onIncrease}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-white/15"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
