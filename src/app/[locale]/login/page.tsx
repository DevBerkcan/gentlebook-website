import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

// Sicherheitsnetz für Direktaufrufe von /login: Header/Footer verlinken das
// "Anmelden" bereits direkt auf siteConfig.externalLoginUrl, diese Route
// fängt trotzdem verbleibende /login-Aufrufe (z. B. alte Bookmarks) ab.
export default function LoginPage() {
  redirect(siteConfig.externalLoginUrl);
}
