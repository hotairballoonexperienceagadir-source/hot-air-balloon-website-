/**
 * Root layout passthrough. The real <html lang="xx"> shells are rendered by
 * app/[lang]/layout.tsx (one per language). This file only exists to host the
 * root "/" redirect (see src/app/page.tsx).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
