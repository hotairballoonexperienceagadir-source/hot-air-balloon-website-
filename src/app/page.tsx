import { permanentRedirect } from "next/navigation";

/**
 * Root route: permanent redirect to the English home (no IP/browser-language
 * auto-redirect; visitors pick their language via the switcher).
 */
export default function Root() {
  permanentRedirect("/en/");
}
