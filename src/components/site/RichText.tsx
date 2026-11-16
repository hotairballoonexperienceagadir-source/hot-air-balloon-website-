import React from "react";
import Link from "next/link";
import { renderTokens } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

/** Parse `[anchor](/path)` inline links + {{TOKENS}} into React nodes. Internal links only. */
export function RichText({ text, lang, className }: { text: string; lang: Lang; className?: string }) {
  const withTokens = renderTokens(text, lang);
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(withTokens))) {
    if (m.index > last) parts.push(withTokens.slice(last, m.index));
    parts.push(
      <Link key={k++} href={m[2]} className="font-medium text-terracotta underline decoration-terracotta/40 underline-offset-2 hover:decoration-terracotta">
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < withTokens.length) parts.push(withTokens.slice(last));
  return <span className={className}>{parts}</span>;
}
