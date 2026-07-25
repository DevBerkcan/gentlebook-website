import { onlineBuchungssystemGuide } from "./online-buchungssystem-funktionen-vorteile-auswahl";
import { terminbuchungDigitalisierenGuide } from "./terminbuchung-digitalisieren-anleitung";
import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [onlineBuchungssystemGuide, terminbuchungDigitalisierenGuide];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export type { BlogPost };
