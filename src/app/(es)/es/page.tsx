import { es } from "@/lib/i18n/dictionaries/es";
import { es as esContent } from "@/lib/i18n/content/es";
import { AgadirHome } from "@/components/site/AgadirHome";

/* The Spanish Agadir homepage at "/es". */
export default function Page() {
  return <AgadirHome dict={es} content={esContent} />;
}
