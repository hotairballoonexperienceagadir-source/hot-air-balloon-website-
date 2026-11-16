import Image from "next/image";
import {
  instagramHandle,
  instagramProfileUrl,
  instagramReels,
} from "@/lib/site";
import { InstagramIcon } from "./icons";

/* Sunrise gradients for the launch state of each tile, matching the site
   brand. The design reference uses the same pattern: vertical tiles with a
   centered Instagram glyph until the real reel thumbnails are provided. */
const tileGradients = [
  "from-navy-950 via-brand-900 to-brand-600",
  "from-navy-900 via-brand-800 to-gold-500",
  "from-[#0a1626] via-[#742d0e] to-brand-400",
  "from-[#16293f] via-[#b3430e] to-gold-400",
];

/**
 * Instagram Reels showcase. Agadir homepage ONLY: never render this
 * component on the Marrakech page. Cards link to the original Reel once its
 * real URL and thumbnail are configured, and to the official profile until
 * then. No fake reel links, no third party media.
 */
export function InstagramReels() {
  return (
    <section id="instagram" className="bg-white py-16 md:py-24" aria-labelledby="instagram-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 ring-1 ring-brand-200">
            <InstagramIcon className="h-4 w-4" aria-hidden="true" /> Follow Us
          </span>
          <h2 id="instagram-title" className="mt-5 font-display text-3xl font-bold text-navy-900 text-balance md:text-5xl">
            Follow Our Journey on Instagram
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Real moments from real flights over the Souss Valley. Watch the
            sunrise reels and tag us in yours, we might feature you next.
          </p>
        </div>

        {/* Desktop: exactly 4 reels in one row. Mobile: swipe carousel. */}
        <ul className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-12 sm:grid sm:grid-cols-4 sm:gap-5 sm:overflow-visible md:gap-6">
          {instagramReels.map((reel, index) => {
            const isReal = Boolean(reel.reelUrl && reel.thumbnail);
            const href = isReal ? reel.reelUrl : instagramProfileUrl;
            const label = isReal
              ? `Watch our Instagram reel: ${reel.alt}, opens in a new tab`
              : "Follow us on Instagram, opens in a new tab";
            return (
              <li
                key={reel.alt}
                className="w-[72%] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="group relative block aspect-[9/16] overflow-hidden rounded-2xl bg-navy-900 shadow-md shadow-navy-950/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                >
                  {isReal ? (
                    <>
                      <Image
                        src={reel.thumbnail}
                        alt={reel.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 640px) 25vw, 72vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span
                        className="absolute inset-0 bg-navy-950/0 transition duration-300 group-hover:bg-navy-950/25"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <span
                      className={`absolute inset-0 bg-gradient-to-br ${tileGradients[index % tileGradients.length]}`}
                      aria-hidden="true"
                    >
                      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
                    </span>
                  )}

                  {/* Centered Instagram glyph overlay on every thumbnail. */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <InstagramIcon
                      className="h-9 w-9 text-white/90 drop-shadow-[0_2px_10px_rgba(6,16,28,0.55)] transition duration-300 group-hover:scale-110 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </span>

                  {/* Orange brand ring on hover, like the reference state. */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-transparent transition duration-300 group-hover:ring-brand-500"
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center sm:mt-12">
          <a
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-brand-500 px-8 py-4 text-sm font-medium tracking-wide text-white shadow-xl shadow-brand-900/25 transition hover:bg-brand-600 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            aria-label={`Open our Instagram profile ${instagramHandle}, opens in a new tab`}
          >
            <InstagramIcon className="h-5 w-5" aria-hidden="true" />
            {instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
