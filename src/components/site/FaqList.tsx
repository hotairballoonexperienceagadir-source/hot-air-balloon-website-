import type { Faq, Lang } from "@/lib/types";
import { RichText } from "./RichText";
import { Chevron } from "./icons";

export function FaqList({ faqs, lang, title }: { faqs: Faq[]; lang: Lang; title?: string }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
      {title && (
        <h3 className="px-5 pt-4 pb-2 text-sm font-semibold uppercase tracking-wide text-terracotta">{title}</h3>
      )}
      {faqs.map((f, i) => (
        <details key={i} className="group" open={i === 0}>
          <summary className="flex items-center justify-between gap-4 px-5 py-4 font-medium text-night hover:bg-sand-light/60">
            <span>{f.q}</span>
            <Chevron className="faq-chevron h-5 w-5 shrink-0 text-terracotta" />
          </summary>
          <div className="px-5 pb-5 leading-relaxed text-foreground/85">
            <RichText text={f.a} lang={lang} />
          </div>
        </details>
      ))}
    </div>
  );
}
