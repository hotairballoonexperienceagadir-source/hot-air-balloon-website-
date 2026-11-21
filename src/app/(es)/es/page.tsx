import { en } from "@/lib/i18n/dictionaries/en";
import { en as enContent } from "@/lib/i18n/content/en";
import { AgadirHome } from "@/components/site/AgadirHome";

/* The Spanish Agadir homepage at "/es". PHASE B: renders the English
 * content; the Spanish translations arrive in Phase C. */
export default function Page() {
  return <AgadirHome dict={en} content={enContent} />;
}
