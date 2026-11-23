import type { Plugin } from "vite";

/**
 * vinext build only (never loaded by `next build` / Vercel).
 *
 * vinext 1.4.6's next/image shim (vinext/dist/shims/image.js) skips srcSet
 * generation for `fill` images and renders a single src at the smallest
 * device size (w=640), so full-bleed heroes look blurry on desktop. Next.js
 * instead builds a srcSet from the `sizes` prop (or from deviceSizes with
 * sizes "100vw" when none is given) and uses the largest width as src.
 *
 * This plugin rewrites that one expression at build time so fill images get
 * the same widths and src as Next.js, reusing vinext's own
 * generateImageAttributes (which already mirrors Next's getWidths for the
 * `sizes` case). If vinext changes the line, the build fails loudly instead of
 * silently shipping blurry images. Remove once vinext fixes it upstream.
 */
const SHIM_ID = /[\\/]vinext[\\/]dist[\\/]shims[\\/]image\.js$/;

const ORIGINAL =
  "const optimizedAttributes = imgWidth && !fill && !skipOptimization ? generateImageAttributes(src, imgWidth, imgQuality, sizes) : void 0;";

const PATCHED =
  "const optimizedAttributes = skipOptimization ? void 0 : fill ? (sizes ? generateImageAttributes(src, 0, imgQuality, sizes) : { src: imageOptimizationUrl(src, RESPONSIVE_WIDTHS[RESPONSIVE_WIDTHS.length - 1], imgQuality), srcSet: RESPONSIVE_WIDTHS.map((w) => `${imageOptimizationUrl(src, w, imgQuality)} ${w}w`).join(\", \") }) : imgWidth ? generateImageAttributes(src, imgWidth, imgQuality, sizes) : void 0;";

export function patchVinextImageShim(code: string): string {
  if (!code.includes(ORIGINAL)) {
    throw new Error(
      "[vinext-image-fill-fix] vinext next/image shim changed: fill srcSet patch no longer applies. Check whether vinext fixed fill images upstream and remove this plugin, or update the patch.",
    );
  }
  return code.replace(ORIGINAL, PATCHED);
}

export function vinextImageFillFix(): Plugin {
  return {
    name: "vinext-image-fill-fix",
    enforce: "pre",
    transform(code, id) {
      if (!SHIM_ID.test(id.split("?")[0])) return null;
      return { code: patchVinextImageShim(code), map: null };
    },
  };
}
