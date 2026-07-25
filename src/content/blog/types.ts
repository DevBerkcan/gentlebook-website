export type BlogSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  /** Kurze, direkte Antwort auf die Suchintention — erscheint als Einleitung. */
  directAnswer: string;
  author: string;
  publishedAt: string; // ISO-Datum
  updatedAt: string; // ISO-Datum
  sections: BlogSection[];
  faq: { q: string; a: string }[];
};
