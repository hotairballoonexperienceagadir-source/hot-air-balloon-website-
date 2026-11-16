import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/types";
import { pageBySlug, pages } from "@/lib/pages";
import { getContent } from "@/lib/content/registry";
import { buildMetadata, buildSchema } from "@/lib/render";
import { HomeTemplate, CityTemplate } from "@/components/templates/Home";
import { ProductTemplate } from "@/components/templates/Product";
import { PricingTemplate, PillarTemplate } from "@/components/templates/Pricing";
import { GuideTemplate, BlogHubTemplate } from "@/components/templates/Guide";
import { ReviewsTemplate, FaqTemplate, BookingTemplate, AboutTemplate, LegalTemplate } from "@/components/templates/Misc";

type Params = Promise<{ lang: string; slug: string[] }>;

export async function generateStaticParams() {
  return pages
    .filter((p) => !p.url.endsWith(`/${p.lang}/`))
    .map((p) => ({ lang: p.lang, slug: p.url.replace(`/${p.lang}/`, "").replace(/\/$/, "").split("/") }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!LANGS.includes(lang as Lang)) return {};
  const page = pageBySlug(lang as Lang, slug);
  if (!page) return {};
  return buildMetadata(page);
}

export default async function CatchAllPage({ params }: { params: Params }) {
  const { lang: raw, slug } = await params;
  const lang = raw as Lang;
  if (!LANGS.includes(lang)) notFound();
  const page = pageBySlug(lang, slug);
  if (!page) notFound();
  const content = getContent(lang, page.id);
  if (!content) notFound();
  const schema = buildSchema(page);
  const props = { page, lang, content, schema };

  switch (page.pageType) {
    case "home":
      return <HomeTemplate {...props} />;
    case "city":
      return <CityTemplate {...props} />;
    case "product":
      return <ProductTemplate {...props} />;
    case "pricing":
      return <PricingTemplate {...props} />;
    case "pillar":
      return <PillarTemplate {...props} />;
    case "guide":
      return <GuideTemplate {...props} />;
    case "blogHub":
      return <BlogHubTemplate {...props} />;
    case "reviews":
      return <ReviewsTemplate {...props} />;
    case "faq":
      return <FaqTemplate {...props} />;
    case "booking":
      return <BookingTemplate {...props} />;
    case "about":
      return <AboutTemplate {...props} />;
    case "legal":
      return <LegalTemplate {...props} />;
    default:
      return <GuideTemplate {...props} />;
  }
}
