import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { LANGS, type Lang, type PageMeta } from "@/lib/types";
import { pageByUrl, pagesByLang, productById, productPage } from "@/lib/pages";
import { ui } from "@/lib/i18n";
import { config } from "@/lib/config";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/StickyMobileBar";
import { CookieConsent } from "@/components/site/CookieConsent";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    metadataBase: new URL(config.domain),
    icons: { icon: "/icon.svg" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw as Lang;
  if (!LANGS.includes(lang)) notFound();

  const home = pageByUrl(`/${lang}/`)!;
  const t = ui(lang);
  const langPages = pagesByLang(lang);
  const findPage = (id: string): PageMeta | undefined =>
    langPages.find((p) => p.id === id) || undefined;

  const navProducts = ["classic", "private", "vip", "camel", "agafay"]
    .map((id) => {
      const product = productById(id);
      const page = (product && (productPage(product, lang) || productPage(product, "en"))) || undefined;
      return page ? { page, flightKey: id, name: t.products[id]?.name || page.metaTitle } : null;
    })
    .filter((x): x is { page: PageMeta; flightKey: string; name: string } => Boolean(x));

  const guidesHub = findPage(`${lang}-blog`);

  const greetings: Record<Lang, string> = {
    en: "Hi! I would like to book a hot air balloon flight in Marrakech.",
    fr: "Bonjour ! Je souhaite réserver un vol en montgolfière à Marrakech.",
    de: "Hallo! Ich möchte eine Heißluftballonfahrt in Marrakesch buchen.",
    es: "¡Hola! Quiero reservar un vuelo en globo en Marrakech.",
    nl: "Hallo! Ik wil een ballonvaart in Marrakech boeken.",
  };

  return (
    <html lang={lang} dir="ltr" data-scroll-behavior="smooth" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-terracotta focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header
          lang={lang}
          home={home}
          products={navProducts}
          agadirUrl={findPage(`${lang}-agadir`)?.url || "/en/agadir-hot-air-balloon/"}
          pricesUrl={langPages.find((p) => p.pageType === "pricing")?.url || "/en/hot-air-balloon-marrakech-price/"}
          guidesUrl={guidesHub?.url || null}
          faqUrl={findPage(`${lang}-faq`)?.url || "/en/faq/"}
          bookUrl={findPage(`${lang}-contact`)?.url || "/en/book/"}
          bookMsg={greetings[lang]}
        />
        {children}
        <Footer lang={lang} home={home} />
        <FloatingWhatsApp lang={lang} />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
