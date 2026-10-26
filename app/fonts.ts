import localFont from "next/font/local";

/**
 * Juliana's own typeface, carried over from juliana.pro. It is the only face on
 * the site. Only 400 and 700 exist in her licensed build — don't reference
 * weights that aren't here, or the browser will synthesise them.
 * See fonts/LICENSE.txt.
 */
export const larsseit = localFont({
  src: [
    { path: "../fonts/Larsseit-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Larsseit-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-larsseit",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});
