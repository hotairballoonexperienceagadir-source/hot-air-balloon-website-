import { de } from "@/lib/i18n/dictionaries/de";
import { de as deContent } from "@/lib/i18n/content/de";
import { AgadirHome } from "@/components/site/AgadirHome";

/* The German Agadir homepage at "/de". */
export default function Page() {
  return <AgadirHome dict={de} content={deContent} />;
}
