import { Jost, Poppins } from "next/font/google";

/* Body font: Jost, Regular 400 for text and Medium 500 for emphasis. */
export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

/* Heading font: Poppins. Only Bold 700 and Semibold 600 are used on the
 * site (headings and one semibold label), so only those two weights are
 * downloaded instead of five. */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
