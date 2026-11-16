import Link from "next/link";
import { breadcrumbTrail, pageById, type PageMeta } from "@/lib/pages";

export function Breadcrumbs({ page, names }: { page: PageMeta; names?: Record<string, string> }) {
  const trail = breadcrumbTrail(page);
  if (trail.length <= 1) return null;
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-sand-light/60">
      <ol className="container-site flex flex-wrap items-center gap-1.5 py-2.5 text-xs text-muted-foreground sm:text-sm">
        {trail.map((t, i) => {
          const isLast = i === trail.length - 1;
          const label = names?.[t.url] || t.name;
          return (
            <li key={t.url} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true" className="text-border">/</span>}
              {isLast ? (
                <span aria-current="page" className="max-w-[60vw] truncate text-foreground/75">{label}</span>
              ) : (
                <Link href={t.url} className="max-w-[40vw] truncate hover:text-terracotta hover:underline">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Resolves friendly short names for breadcrumbs (H1s are long). */
export function breadcrumbNames(lang: string): Record<string, string> {
  const map: Record<string, Record<string, string>> = {
    en: { "/en/": "Home", "/en/guide/": "Guides", "/en/marrakech/sunrise-balloon-flight/": "Sunrise Balloon Flight" },
    fr: { "/fr/": "Accueil", "/fr/guide/": "Guides" },
    de: { "/de/": "Startseite" },
    es: { "/es/": "Inicio" },
    nl: { "/nl/": "Home" },
  };
  return map[lang] || {};
}

/** Utility: parent page id -> name used for breadcrumbs when needed */
export function parentName(page: PageMeta): string | undefined {
  if (!page.parent) return undefined;
  return pageById(page.parent)?.h1;
}
