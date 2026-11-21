import { es } from "@/lib/i18n/dictionaries/es";
import { es as esContent } from "@/lib/i18n/content/es";
import { MarrakechPage } from "@/components/site/MarrakechPage";

/* The Spanish Marrakech page at "/es/globo-aerostatico-marrakech". */
export default function Page() {
  return <MarrakechPage dict={es} content={esContent} />;
}
