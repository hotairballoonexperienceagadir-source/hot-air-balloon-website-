import { fr } from "@/lib/i18n/dictionaries/fr";
import { fr as frContent } from "@/lib/i18n/content/fr";
import { AgadirHome } from "@/components/site/AgadirHome";

/* The French Agadir homepage at "/fr". */
export default function Page() {
  return <AgadirHome dict={fr} content={frContent} />;
}
