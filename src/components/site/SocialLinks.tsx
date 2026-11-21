"use client";

import { socialLinks } from "@/lib/site";
import { useI18n } from "@/lib/i18n/context";
import { tpl } from "@/lib/i18n/format";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";

const iconByName = {
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
  Instagram: InstagramIcon,
} as const;

/**
 * Official Agadir social media icon row.
 *
 * Belongs EXCLUSIVELY to the Agadir brand: render it only on the Agadir
 * homepage (footer brand column and closing CTA). Never import this
 * component into the Marrakech page or any Marrakech component.
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  const { dict } = useI18n();
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = iconByName[social.name];
        return (
          <li key={social.name}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tpl(dict.social.followAria, { name: social.name })}
              title={tpl(dict.social.followTitle, { name: social.name })}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-cream-100 shadow-lg shadow-navy-950/40 transition hover:border-brand-400 hover:bg-brand-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
