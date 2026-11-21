import { de } from "@/lib/i18n/dictionaries/de";
import { de as deContent } from "@/lib/i18n/content/de";
import { MarrakechPage } from "@/components/site/MarrakechPage";

/* The German Marrakech page at "/de/ballonfahrt-marrakesch". */
export default function Page() {
  return <MarrakechPage dict={de} content={deContent} />;
}
