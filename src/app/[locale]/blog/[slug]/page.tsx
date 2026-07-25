import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/marketing/BlogArticle";
import { blogPosts, getBlogPost } from "@/content/blog";

// Ratgeber ist aktuell deutschsprachig — bewusst kein /en-Pendant, bis
// englische Fachartikel vorliegen (keine automatisch übersetzten Dünn-Inhalte).
export const dynamicParams = false;
export function generateStaticParams() {
  return blogPosts.map((post) => ({ locale: "de", slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "de") notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}
