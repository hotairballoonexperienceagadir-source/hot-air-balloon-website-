import { en } from "@/lib/i18n/dictionaries/en";
import { en as enContent } from "@/lib/i18n/content/en";
import { MarrakechPage } from "@/components/site/MarrakechPage";

/* The French Marrakech page at "/fr/montgolfiere-marrakech". PHASE B:
 * renders the English content; the French translations arrive in Phase C. */
export default function Page() {
  return <MarrakechPage dict={en} content={enContent} />;
}
