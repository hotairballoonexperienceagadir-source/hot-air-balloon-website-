import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function FaqSection() {
  return (
    <section id="faq" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Everything you need to know before your balloon flight over Marrakech or Agadir.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${index}`}
              className="rounded-2xl border border-border bg-cream-50 px-5 shadow-sm data-[state=open]:border-brand-300"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-bold text-foreground hover:no-underline md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">Still have a question?</p>
          <Button asChild className="mt-3 rounded-full bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600">
            <a href={waLink("Hello! I have a question about the balloon flights.")} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" />
              Ask Us on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
