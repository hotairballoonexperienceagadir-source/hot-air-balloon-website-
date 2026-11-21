import { fr } from "@/lib/i18n/dictionaries/fr";
import { fr as frContent } from "@/lib/i18n/content/fr";
import { MarrakechPage } from "@/components/site/MarrakechPage";

/* The French Marrakech page at "/fr/montgolfiere-marrakech". */
export default function Page() {
  return <MarrakechPage dict={fr} content={frContent} />;
}
