import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/types";
import { pageByUrl } from "@/lib/pages";
import { getContent } from "@/lib/content/registry";
import { buildMetadata, buildSchema } from "@/lib/render";
import { HomeTemplate } from "@/components/templates/Home";

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) return {};
  const page = pageByUrl(`/${lang}/`);
  if (!page) return {};
  return buildMetadata(page);
}

export default async function LangHome({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = raw as Lang;
  if (!LANGS.includes(lang)) notFound();
  const page = pageByUrl(`/${lang}/`);
  if (!page) notFound();
  const content = getContent(lang, page.id);
  if (!content) notFound();
  const schema = buildSchema(page);
  return <HomeTemplate page={page} lang={lang} content={content} schema={schema} />;
}
