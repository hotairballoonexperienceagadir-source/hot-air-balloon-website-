import { en } from "@/lib/i18n/dictionaries/en";
import { en as enContent } from "@/lib/i18n/content/en";
import { AgadirHome } from "@/components/site/AgadirHome";

/* The English Agadir homepage at "/" (default language, URL unchanged). */
export default function Page() {
  return <AgadirHome dict={en} content={enContent} />;
}
