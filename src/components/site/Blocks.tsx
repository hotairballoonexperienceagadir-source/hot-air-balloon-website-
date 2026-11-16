import Image from "next/image";
import type { Block, Lang, PageContent } from "@/lib/types";
import { image } from "@/lib/images";
import { RichText } from "./RichText";

/**
 * Renders the rich-text body blocks authored in the language content modules.
 * Guides additionally get a table of contents generated from their h2 blocks.
 */
export function BodyBlocks({ blocks, lang, withToc = false, content }: { blocks: Block[]; lang: Lang; withToc?: boolean; content?: PageContent }) {
  const headings = blocks.filter((b) => b.t === "h2") as { t: "h2"; text: string }[];
  let galleryInserted = false;

  return (
    <div className="prose-custom mx-auto max-w-3xl">
      {withToc && headings.length > 2 && (
        <nav aria-label="Table of contents" className="mb-8 rounded-2xl border border-sand-dark bg-sand-light p-5 not-prose">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-terracotta">Table of contents</p>
          <ol className="ml-4 list-decimal space-y-1 text-sm text-night">
            {headings.map((h) => (
              <li key={h.text}>
                <a href={`#${slugify(h.text)}`} className="hover:text-terracotta hover:underline">
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {blocks.map((b, i) => {
        if (b.t === "h2") {
          return (
            <h2 key={i} id={slugify(b.text)} className="mb-4 mt-12 text-2xl font-bold text-night sm:text-3xl">
              {b.text}
            </h2>
          );
        }
        if (b.t === "h3") {
          return (
            <h3 key={i} className="mb-3 mt-8 text-xl font-semibold text-night">
              {b.text}
            </h3>
          );
        }
        if (b.t === "p") {
          return (
            <p key={i} className="mb-5 leading-relaxed text-foreground/90">
              <RichText text={b.text} lang={lang} />
            </p>
          );
        }
        if (b.t === "ul") {
          return (
            <ul key={i} className="mb-6 ml-1 space-y-2">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-3 leading-relaxed text-foreground/90">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  <span><RichText text={item} lang={lang} /></span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.t === "img") {
          const img = image(b.key);
          return (
            <figure key={i} className="mb-8">
              <div className="overflow-hidden rounded-2xl">
                <Image src={img.src} alt={b.alt} width={img.width} height={img.height} className="h-auto w-full" sizes="(max-width: 768px) 100vw, 768px" />
              </div>
              {b.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{b.caption}</figcaption>}
            </figure>
          );
        }
        if (b.t === "quote") {
          return (
            <blockquote key={i} className="mb-8 rounded-2xl border-l-4 border-gold bg-sand-light p-5 italic text-night">
              <RichText text={b.text} lang={lang} />
              {b.author && <footer className="mt-2 text-sm not-italic text-muted-foreground">- {b.author}</footer>}
            </blockquote>
          );
        }
        return null;
      })}

      {/* Gallery placeholder marker: if content has gallery and body contains the special h2 marker, inject gallery after it */}
      {content?.gallery && !galleryInserted && null}
    </div>
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}
